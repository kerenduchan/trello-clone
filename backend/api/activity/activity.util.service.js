import { ObjectId } from 'mongodb'
import { activityService } from '../activity/activity.service.js'

export const activityUtilService = { taskCreated, taskUpdated, taskDeleted }

async function taskCreated(board, group, task) {
    const activity = _getTaskActivity(
        'task-created',
        userId,
        board,
        group,
        task
    )
    return activityService.create(activity)
}

async function taskUpdated(userId, board, group, task, fields) {
    let activity
    if ('archivedAt' in fields) {
        activity = _getTaskActivity(
            fields.archivedAt ? 'task-archived' : 'task-unarchived',
            userId,
            board,
            group,
            task
        )
    }
    if (activity) {
        return activityService.create(activity)
    }
    return null
}

async function taskDeleted(userId, board, group, task) {
    const activity = _getTaskActivity(
        'task-deleted',
        userId,
        board,
        group,
        task
    )
    return activityService.create(activity)
}

function _getTaskActivity(type, userId, board, group, task) {
    return {
        _id: new ObjectId(),
        type,
        userId,
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        data: {
            taskTitle: task.title,
            groupTitle: group.title,
        },
        performedAt: Date.now(),
    }
}
