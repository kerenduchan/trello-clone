import { store } from '../../store'
import {
    taskCreated,
    taskUpdated,
    taskDeleted,
} from '../../reducers/board.reducer'
import { taskService } from '../../../services/task.service'
import { utilService } from '../../../services/util.service'
import { authService } from '../../../services/auth.service'

export {
    createTask,
    deleteTask,
    updateTask,
    removeTaskLabel,
    addTaskLabel,
    setTaskCoverImage,
    addTaskCoverImage,
    setTaskCoverColor,
    removeTaskCover,
    addTaskAttachment,
    deleteTaskAttachment,
    updateTaskAttachment,
}

async function createTask(board, group, position, task) {
    try {
        // optimistic update
        store.dispatch(taskCreated({ board, group, position, task }))
        await taskService.createTask(board, group, position, task)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function deleteTask(hierarchy) {
    try {
        // optimistic update
        store.dispatch(taskDeleted({ ...hierarchy }))
        await taskService.deleteTask(hierarchy)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function updateTask(hierarchy, fieldsToUpdate) {
    const { board, group, task } = hierarchy
    const updatedTask = { ...task, ...fieldsToUpdate }
    _updateTask(board, group, updatedTask)
}

// TASK LABEL

async function addTaskLabel(hierarchy, label) {
    const { board, task } = hierarchy
    const taskLabelIds = [...task.labelIds, label._id]

    // keep the same order of labels as in the board labels
    const orderedTaskLabelIds = board.labels
        .filter((l) => taskLabelIds.includes(l._id))
        .map((l) => l._id)

    return updateTask(hierarchy, { labelIds: orderedTaskLabelIds })
}

async function removeTaskLabel(hierarchy, label) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    const taskLabelIds = task.labelIds.filter((id) => id !== label._id)

    // keep the same order of labels as in the board labels
    taskToUpdate.labelIds = board.labels
        .filter((l) => taskLabelIds.includes(l._id))
        .map((l) => l._id)
    return _updateTask(board, group, taskToUpdate)
}

// TASK COVER IMAGE

async function addTaskCoverImage(hierarchy, imgUrl) {
    const { task } = hierarchy
    const attachment = _createAttachment(imgUrl)
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
        size: 'large',
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
        size: task.cover.size,
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

// TASK ATTACHMENT

async function addTaskAttachment(hierarchy, fileUrl) {
    const { task } = hierarchy
    const attachment = _createAttachment(fileUrl)
    const attachments = task.attachments ? [...task.attachments] : []
    attachments.push(attachment)
    await updateTask(hierarchy, { attachments })
    return attachment
}

async function deleteTaskAttachment(hierarchy, attachment) {
    // TODO: also delete the attachment from cloudinary
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }

    taskToUpdate.attachments = task.attachments.filter(
        (a) => a._id !== attachment._id
    )

    // if this attachment was the task cover, remove task cover
    if (task.cover?.bgImage?.attachmentId === attachment._id) {
        const cover = { size: task.cover.size || 'small' }
        taskToUpdate.cover = cover
    }

    return _updateTask(board, group, taskToUpdate)
}

async function updateTaskAttachment(hierarchy, attachment) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }

    taskToUpdate.attachments = task.attachments.map((a) =>
        a._id === attachment._id ? attachment : a
    )

    return _updateTask(board, group, taskToUpdate)
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

async function _updateTask(board, group, task) {
    try {
        // optimistic update
        store.dispatch(taskUpdated({ board, group, task }))
        await taskService.updateTask(board, group, task)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

function _createAttachment(fileUrl) {
    const urlParts = fileUrl.split('/')
    const title = urlParts[urlParts.length - 1]

    const attachment = {
        _id: utilService.makeId(),
        title,
        createdAt: Date.now(),
        createdBy: authService.getLoggedinUser()._id,
        fileUrl,
    }
    return attachment
}
