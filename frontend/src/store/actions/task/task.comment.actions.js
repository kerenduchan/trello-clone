import { authService } from '../../../services/auth.service'
import { updateTask } from './task.actions'

export { addTaskComment, deleteTaskComment, updateTaskComment }

// COMMENT

async function addTaskComment(hierarchy, comment) {
    const { task } = hierarchy

    // todo: comment created by and created at should be set by the server
    comment.createdBy = authService.getLoggedinUser()._id
    comment.createdAt = Date.now()
    let comments = task.comments ? [...task.comments] : []
    comments.unshift(comment)
    return updateTask(hierarchy, { comments })
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
