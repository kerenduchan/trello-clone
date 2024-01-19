import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    getActivityCreateComment,
    getActivityCreateTask,
    getDescription,
}

function getActivityCreateComment(hierarchy, comment) {
    const { board, group, task } = hierarchy

    let activity = _getActivity(
        'task-comment',
        board._id,
        group._id,
        task._id,
        Date.now()
    )

    activity.comment = {
        ...comment,
        createdAt: Date.now(),
        createdBy: activity.userId,
    }

    return activity
}

function getActivityCreateTask(board, group, task, performedAt) {
    let activity = _getActivity(
        'create-task',
        board._id,
        group._id,
        task._id,
        performedAt
    )
    activity.data = {
        groupName: group.title,
    }
    return activity
}

function getDescription(activity) {
    switch (activity.type) {
        case 'create-task':
            return 'added this card to ' + activity.data.groupName
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
