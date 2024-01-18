import { store } from '../../store/store'

export const activityUtilService = { getActivityCreateComment }

function getActivityCreateComment(hierarchy, comment) {
    const { board, group, task } = hierarchy
    const creatorId = store.getState().app.loggedinUser._id
    const activity = {
        _id: comment._id,
        userId: creatorId,
        type: 'task-comment',
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        comment: {
            ...comment,
            createdAt: Date.now(),
            createdBy: creatorId,
        },
    }
    return activity
}
