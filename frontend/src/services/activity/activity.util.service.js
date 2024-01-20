import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    getCommentActivity,
    getTaskActivity,
    getGroupActivity,
}

function getCommentActivity(hierarchy, comment) {
    const { task } = hierarchy
    let activity = _getTaskActivity('task-comment', hierarchy)

    activity.data = {
        ...comment,
        taskTitle: task.title,
        createdAt: Date.now(),
        createdBy: activity.userId,
    }

    return activity
}

function getTaskActivity(type, hierarchy) {
    const { group, task } = hierarchy

    let activity = _getTaskActivity(type, hierarchy)
    activity.data = {
        taskTitle: task.title,
        groupTitle: group.title,
    }
    return activity
}

function getGroupActivity(type, board, group) {
    return {
        _id: utilService.makeId(),
        userId: store.getState().app.loggedinUser._id,
        type,
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        data: {
            groupTitle: group.title,
        },
    }
}

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

function _getTaskActivity(type, hierarchy) {
    const { board, group, task } = hierarchy
    return {
        _id: utilService.makeId(),
        userId: store.getState().app.loggedinUser._id,
        type,
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
    }
}
