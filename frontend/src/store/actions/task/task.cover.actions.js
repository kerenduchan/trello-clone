import { utilService } from '../../../services/util.service'
import { updateTask } from './task.actions'
import { createAttachment } from './task.attachment.actions'

export {
    setTaskCoverImage,
    addTaskCoverImage,
    setTaskCoverColor,
    removeTaskCover,
}

async function addTaskCoverImage(hierarchy, imgUrl) {
    const { task } = hierarchy
    const attachment = createAttachment(imgUrl)
    const attachments = task.attachments ? [...task.attachments] : []
    attachments.push(attachment)
    const taskToUpdate = { ...task, attachments }

    const newHierarchy = { ...hierarchy, task: taskToUpdate }
    return setTaskCoverImage(newHierarchy, attachment)
}

async function setTaskCoverImage(hierarchy, attachment) {
    const url = attachment.fileUrl

    const color = await utilService.getAverageColor(url)
    const theme = utilService.getThemeByAverageColor(color)

    const cover = {
        size: hierarchy.task.cover?.size || 'small',
        bgImage: {
            url,
            color: color.hex,
            attachmentId: attachment._id,
            textColor: 'dark',
        },

        theme,
    }

    updateTask(hierarchy, { cover })
}

// TASK COVER COLOR

async function setTaskCoverColor(hierarchy, c) {
    const { task } = hierarchy

    // retain size, update bg color and text color, and no bg image
    const cover = {
        size: task.cover?.size || 'small',
        bgColor: {
            _id: c._id,
            color: c.color,
            textColor: c.textColor,
        },
        theme: c._id === 'gray' ? 'dark' : 'light',
    }
    updateTask(hierarchy, { cover })
}

async function removeTaskCover(hierarchy) {
    const prevCover = hierarchy.task.cover
    const cover = { size: prevCover.size || 'small' }
    updateTask(hierarchy, { cover })
}
