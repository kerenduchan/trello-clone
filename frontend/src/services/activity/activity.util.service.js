import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    commentCreated,
    taskCreated,
    taskDeleted,
    taskArchived,
    taskUnarchived,
}

function commentCreated(hierarchy, comment) {
    const { task } = hierarchy
    let activity = _getActivity('task-comment', hierarchy)

    activity.data = {
        ...comment,
        taskTitle: task.title,
        createdAt: Date.now(),
        createdBy: activity.userId,
    }

    return activity
}

function taskCreated(hierarchy) {
    return _getTaskActivity('task-created', hierarchy)
}

function taskDeleted(hierarchy) {
    return _getTaskActivity('task-deleted', hierarchy)
}

function taskArchived(hierarchy) {
    return _getTaskActivity('task-archived', hierarchy)
}

function taskUnarchived(hierarchy) {
    return _getTaskActivity('task-unarchived', hierarchy)
}

function _getTaskActivity(type, hierarchy) {
    const { group, task } = hierarchy

    let activity = _getActivity(type, hierarchy)
    activity.data = {
        taskTitle: task.title,
        groupTitle: group.title,
    }
    return activity
}

function _getActivity(type, hierarchy) {
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
