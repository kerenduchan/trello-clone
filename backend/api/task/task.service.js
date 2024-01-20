import { utilService } from '../../services/util.service.js'
import Board from '../../db/model/Board.js'
import { groupService } from '../group/group.service.js'
import { activityUtilService } from '../activity/activity.util.service.js'
import { boardService } from '../board/board.service.js'
import { activityService } from '../activity/activity.service.js'

export const taskService = {
    getById,
    create,
    update,
    remove,
}

// fields that can be set upon creation. Client sets the ID (for optimistic create).
const CREATE_FIELDS = ['title', 'creatorId', '_id']

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

async function create(boardId, groupId, task) {
    const position = task.position

    // disregard unexpected fields
    task = utilService.extractFields(task, CREATE_FIELDS)

    // TODO: validation

    try {
        const board = await Board.findOneAndUpdate(
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

        if (!board) {
            throw 'Board or group not found'
        }

        const group = board.groups.find((g) => g._id === groupId)
        const addedTask = group.tasks[position]

        const hierarchy = { board, group, task: addedTask }
        const activity = activityUtilService.getTaskActivity(
            'task-created',
            task.creatorId,
            hierarchy
        )
        await activityService.create(activity)
        return addedTask
    } catch (err) {
        utilService.handleDbError(err)
    }
}

async function update(userId, boardId, groupId, taskId, fields) {
    // disregard unexpected fields
    fields = utilService.extractFields(fields, UPDATE_FIELDS)

    // TODO: validation

    // archivedAt - Pass isArchived=true to set archivedAt to now.
    // Pass isArchived=false to set archivedAt to null.
    if ('isArchived' in fields) {
        fields.archivedAt = fields.isArchived ? Date.now() : null
        delete fields.isArchived
    }

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

    const hierarchy = {
        board: updatedBoard,
        group: updatedGroup,
        task: updatedTask,
    }
    await _createActivityForUpdateTask(userId, hierarchy, fields)

    return updatedTask
}

async function remove(userId, boardId, groupId, taskId) {
    const board = await boardService.getById(boardId)
    if (!board) throw 'Board not found'

    const group = board.groups.find((g) => g._id === groupId)
    if (!group) throw 'Group not found'

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

    const hierarchy = { board: updatedBoard, group, task }
    const activity = activityUtilService.getTaskActivity(
        'task-deleted',
        userId,
        hierarchy
    )
    await activityService.create(activity)

    return { deletedCount: 1 }
}

async function _createActivityForUpdateTask(userId, hierarchy, fields) {
    let activity
    if ('archivedAt' in fields) {
        activity = activityUtilService.getTaskActivity(
            fields.archivedAt ? 'task-archived' : 'task-unarchived',
            userId,
            hierarchy
        )
    } else if ('checklists' in fields) {
        console.log('checklists activity...')
    }
    if (activity) {
        return activityService.create(activity)
    }
}
