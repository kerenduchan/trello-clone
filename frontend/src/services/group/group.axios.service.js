import { axiosService } from '../axios.service'

export const groupAxiosService = {
    createGroup,
    deleteGroup,
    updateGroup,
}

async function deleteGroup(board, group) {
    return axiosService.remove(_getBaseUrl(board._id), group._id)
}

async function updateGroup(board, group) {
    return axiosService.update(_getBaseUrl(board._id), group)
}

async function createGroup(board, group) {
    return axiosService.create(_getBaseUrl(board._id), group)
}

function _getBaseUrl(boardId) {
    return `${axiosService.getBaseUrl()}board/${boardId}/group/`
}
