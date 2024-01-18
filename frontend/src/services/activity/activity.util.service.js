import { store } from '../../store/store'

export const activityUtilService = { getActivityCreateComment }

function getActivityCreateComment(hierarchy, comment) {
    const { board, group, task } = hierarchy
    const activity = {
        _id: comment._id,
        userId: store.getState().app.loggedinUser._id,
        type: 'task-comment',
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        text: comment.text,
    }
    return activity
}
