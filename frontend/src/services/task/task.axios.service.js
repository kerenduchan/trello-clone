import { axiosService } from '../axios.service'

export const taskAxiosService = {
    createTask,
    deleteTask,
    updateTask,
}

async function updateTask(board, group, task) {
    const taskToSend = { ...task }
    if (task.archivedAt !== undefined) {
        if (task.archivedAt === null) {
            taskToSend.isArchived = false
        } else {
            taskToSend.isArchived = true
        }
    }
    delete taskToSend.archivedAt

    const baseUrl = _getBaseUrl(board._id, group._id)
    return axiosService.update(baseUrl, taskToSend)
}

async function createTask(board, group, position, task) {
    const baseUrl = _getBaseUrl(board._id, group._id)
    return axiosService.create(baseUrl, { ...task, position })
}

async function deleteTask(hierarchy) {
    const { board, group, task } = hierarchy
    const baseUrl = _getBaseUrl(board._id, group._id)
    return axiosService.remove(baseUrl, task._id)
}

function _getBaseUrl(boardId, groupId) {
    return `${axiosService.getBaseUrl()}board/${boardId}/group/${groupId}/task/`
}
