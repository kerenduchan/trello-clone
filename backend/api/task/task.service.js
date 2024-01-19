import { ObjectId } from 'mongodb'
import { utilService } from '../../services/util.service.js'
import Board from '../../db/model/Board.js'
import { groupService } from '../group/group.service.js'
import { activityService } from '../activity/activity.service.js'

export const taskService = {
    getById,
    create,
    update,
    remove,
}

// fields that can be set upon creation. Client sets the ID (for optimistic create).
const CREATE_FIELDS = ['title', '_id']

// fields that can be updated
const UPDATE_FIELDS = [
    'title',
    'isArchived',
    'comments',
    'labelIds',
    'description',
    'memberIds',
    'checklists',
    'dates',
    'attachments',
    'cover',
]

async function getById(boardId, groupId, taskId) {
    const group = await groupService.getById(boardId, groupId)
    const task = group.tasks?.find((t) => t._id === taskId)
    if (!task) {
        throw 'Task not found'
    }
    return task
}

async function create(creatorId, boardId, groupId, task, position) {
    // disregard unexpected fields
    task = utilService.extractFields(task, CREATE_FIELDS)

    // TODO: validation

    try {
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId, 'groups._id': groupId },
            {
                $push: {
                    'groups.$.tasks': {
                        $each: [task],
                        $position: position,
                    },
                },
            },
            { new: true }
        )

        if (!updatedBoard) {
            throw 'Board or group not found'
        }

        const group = updatedBoard.groups.find((g) => g._id === groupId)
        const addedTask = group.tasks.slice(-1)[0]

        // create an activity recording this task creation
        const activity = {
            _id: new ObjectId(),
            userId: creatorId,
            boardId,
            groupId,
            taskId: addedTask._id,
            type: 'create-task',
            data: {
                groupTitle: group.title,
            },
            performedAt: addedTask.createdAt,
        }

        activityService.create(activity)

        return addedTask
    } catch (err) {
        utilService.handleDbError(err)
    }
}

async function update(boardId, groupId, taskId, fields) {
    // disregard unexpected fields
    fields = utilService.extractFields(fields, UPDATE_FIELDS)

    // TODO: validation

    // archivedAt - Pass isArchived=true to set archivedAt to now.
    // Pass isArchived=false to set archivedAt to null.
    if (fields.isArchived) {
        fields.archivedAt = Date.now()
    } else if (fields.isArchived === false) {
        fields.archivedAt = null
    }
    delete fields.isArchived

    let group = await groupService.getById(boardId, groupId)
    let task = group.tasks.find((t) => t._id === taskId)
    if (!task) {
        throw 'Task not found'
    }
    task = { ...task, ...fields }

    group.tasks = group.tasks.map((t) => (t._id === task._id ? task : t))

    const updatedBoard = await Board.findOneAndUpdate(
        { _id: boardId, 'groups._id': groupId },
        {
            $set: {
                'groups.$.tasks': group.tasks,
            },
        },
        { new: true }
    )

    if (!updatedBoard) {
        throw 'Board or group not found'
    }

    // Extract and return the updated task
    const updatedGroup = updatedBoard.groups.find((g) => g._id === groupId)
    if (!updatedGroup) {
        throw 'Group not found in the updated board'
    }

    const updatedTask = updatedGroup.tasks?.find((t) => t._id === taskId)
    if (!updatedTask) {
        throw 'Task not found in the updated group'
    }
    return updatedTask
}

async function remove(boardId, groupId, taskId) {
    let group = await groupService.getById(boardId, groupId)

    let task = group.tasks.find((t) => t._id === taskId)
    if (!task) {
        return { deletedCount: 0 }
    }

    group.tasks = group.tasks.filter((t) => t._id !== task._id)

    const updatedBoard = await Board.findOneAndUpdate(
        { _id: boardId, 'groups._id': groupId },
        {
            $set: {
                'groups.$.tasks': group.tasks,
            },
        },
        { new: true }
    )

    if (!updatedBoard) {
        throw 'Board or group not found'
    }
    return { deletedCount: 1 }
}
