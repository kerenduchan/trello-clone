import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    getActivityCreateComment,
    getActivityCreateTask,
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
    const activity = _getActivity(
        'create-task',
        board._id,
        group._id,
        task._id,
        performedAt
    )
    return activity
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
