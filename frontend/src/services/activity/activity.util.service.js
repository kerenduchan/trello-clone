import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    buildCreateCommentActivity,
    buildCreateTaskActivity,
    getDescription,
}

function buildCreateCommentActivity(hierarchy, comment) {
    const { board, group, task } = hierarchy

    let activity = _getActivity(
        'task-comment',
        board._id,
        group._id,
        task._id,
        Date.now()
    )

    activity.data = {
        ...comment,
        taskTitle: task.title,
        createdAt: Date.now(),
        createdBy: activity.userId,
    }

    return activity
}

function buildCreateTaskActivity(board, group, task, performedAt) {
    let activity = _getActivity(
        'create-task',
        board._id,
        group._id,
        task._id,
        performedAt
    )
    activity.data = {
        taskTitle: task.title,
        groupTitle: group.title,
    }
    return activity
}

function getDescription(activity) {
    switch (activity.type) {
        case 'create-task':
            return 'added this card to ' + activity.data.groupTitle
    }
}

function _getActivity(type, boardId, groupId, taskId, performedAt) {
    return {
        _id: utilService.makeId(),
        userId: store.getState().app.loggedinUser._id,
        type,
        performedAt,
        boardId,
        groupId,
        taskId,
    }
}
