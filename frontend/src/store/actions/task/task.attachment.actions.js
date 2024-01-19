import { store } from '../../store'
import { utilService } from '../../../services/util.service'
import { updateTask } from './task.actions'

export {
    addTaskAttachment,
    deleteTaskAttachment,
    updateTaskAttachment,
    createAttachment,
}

async function addTaskAttachment(hierarchy, fileUrl) {
    const { task } = hierarchy
    const attachment = createAttachment(fileUrl)
    const attachments = task.attachments ? [...task.attachments] : []
    attachments.push(attachment)
    await updateTask(hierarchy, { attachments })
    return attachment
}

async function deleteTaskAttachment(hierarchy, attachment) {
    // TODO: also delete the attachment from cloudinary
    const { task } = hierarchy

    const attachments = task.attachments.filter((a) => a._id !== attachment._id)
    const fieldsToUpdate = { attachments }

    // if this attachment was the task cover, remove task cover
    if (task.cover?.bgImage?.attachmentId === attachment._id) {
        const cover = { size: task.cover.size || 'small' }
        fieldsToUpdate.cover = cover
    }

    return updateTask(hierarchy, fieldsToUpdate)
}

async function updateTaskAttachment(hierarchy, attachment) {
    const { task } = hierarchy

    const attachments = task.attachments.map((a) =>
        a._id === attachment._id ? attachment : a
    )

    return updateTask(hierarchy, { attachments })
}

function createAttachment(fileUrl) {
    const urlParts = fileUrl.split('/')
    const title = urlParts[urlParts.length - 1]

    const attachment = {
        _id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        createdBy: store.getState().app.loggedinUser._id,
        fileUrl,
    }
    return attachment
}
