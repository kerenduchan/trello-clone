import { store } from '../../store'
import { updateTask } from './task.actions'
import { activityService } from '../../../services/activity/activity.service'
import { activityUtilService } from '../../../services/activity/activity.util.service'
import { activityCreated } from '../../reducers/board.reducer'

export { addTaskComment, deleteTaskComment, updateTaskComment }

// COMMENT

async function addTaskComment(hierarchy, comment) {
    try {
        // optimistic update
        const activity = activityUtilService.getActivityCreateComment(
            hierarchy,
            comment
        )
        store.dispatch(activityCreated({ activity }))
        await activityService.createComment(hierarchy, comment)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function deleteTaskComment(hierarchy, comment) {
    const { task } = hierarchy
    const comments = task.comments.filter((c) => c._id !== comment._id)
    return updateTask(hierarchy, { comments })
}

async function updateTaskComment(hierarchy, comment, fieldsToUpdate) {
    const { task } = hierarchy

    // todo: isEdited should be set by the server
    const updatedComment = { ...comment, ...fieldsToUpdate, isEdited: true }
    const comments = task.comments.map((c) =>
        c._id === comment._id ? updatedComment : c
    )
    return updateTask(hierarchy, { comments })
}
