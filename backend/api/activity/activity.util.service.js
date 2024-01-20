import { ObjectId } from 'mongodb'
import { activityService } from '../activity/activity.service.js'

export const activityUtilService = {
    getTaskActivity,
    groupCreated,
    groupUpdated,
}

function getTaskActivity(type, userId, hierarchy) {
    const { board, group, task } = hierarchy
    return {
        _id: new ObjectId(),
        type,
        userId,
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        taskTitle: task.title,
        groupTitle: group.title,
        performedAt: Date.now(),
    }
}

async function groupCreated(userId, board, group) {
    const activity = _getGroupActivity('group-created', userId, board, group)
    return activityService.create(activity)
}

async function groupUpdated(userId, board, group, fields) {
    let activity
    if ('archivedAt' in fields) {
        activity = _getGroupActivity(
            fields.archivedAt ? 'group-archived' : 'group-unarchived',
            userId,
            board,
            group
        )
    }
    if (activity) {
        return activityService.create(activity)
    }
    return null
}

function _getGroupActivity(type, userId, board, group) {
    return {
        _id: new ObjectId(),
        type,
        userId,
        boardId: board._id,
        groupId: group._id,
        groupTitle: group.title,
        performedAt: Date.now(),
    }
}
