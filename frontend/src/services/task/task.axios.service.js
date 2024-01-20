import { axiosService } from '../axios.service'

export const taskAxiosService = {
    createTask,
    deleteTask,
    updateTask,
}

async function updateTask(board, group, taskId, fields) {
    if ('archivedAt' in fields) {
        fields.isArchived = fields.archivedAt !== null
        delete fields.archivedAt
    }

    const baseUrl = _getBaseUrl(board._id, group._id) + taskId
    return axiosService.update(baseUrl, fields)
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
