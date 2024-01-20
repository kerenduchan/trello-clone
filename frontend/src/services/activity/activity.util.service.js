import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    commentCreated,
    taskCreated,
    taskDeleted,
    getDescription,
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
    const { group, task } = hierarchy

    let activity = _getActivity('task-created', hierarchy)
    activity.data = {
        taskTitle: task.title,
        groupTitle: group.title,
    }
    return activity
}

function taskDeleted(hierarchy) {
    let activity = _getActivity('task-deleted', hierarchy)
    activity.data = {
        taskTitle: task.title,
        groupTitle: group.title,
    }
    return activity
}

// This description is shown inside the task details.
// The description in the board menu > Activities is different.
function getDescription(activity) {
    switch (activity.type) {
        case 'task-created':
            return 'added this card to ' + activity.data.groupTitle
    }
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
