import { axiosService } from '../axios.service'

export const groupAxiosService = {
    createGroup,
    deleteGroup,
    updateGroup,
}

async function deleteGroup(board, group) {
    return axiosService.remove(_getBaseUrl(board._id), group._id)
}

async function updateGroup(board, groupId, fields) {
    if ('archivedAt' in fields) {
        fields.isArchived = fields.archivedAt !== null
        delete fields.archivedAt
    }

    return axiosService.update(_getBaseUrl(board._id) + groupId, fields)
}

async function createGroup(board, group) {
    return axiosService.create(_getBaseUrl(board._id), group)
}

function _getBaseUrl(boardId) {
    return `${axiosService.getBaseUrl()}board/${boardId}/group/`
}
