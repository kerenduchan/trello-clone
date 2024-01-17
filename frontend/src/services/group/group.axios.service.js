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
    const groupToSend = { ...group }
    if (group.archivedAt !== undefined) {
        if (group.archivedAt === null) {
            groupToSend.isArchived = false
        } else {
            groupToSend.isArchived = true
        }
    }
    delete groupToSend.archivedAt

    return axiosService.update(_getBaseUrl(board._id), groupToSend)
}

async function createGroup(board, group) {
    return axiosService.create(_getBaseUrl(board._id), group)
}

function _getBaseUrl(boardId) {
    return `${axiosService.getBaseUrl()}board/${boardId}/group/`
}
