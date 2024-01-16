import { boardService } from './../board/board.service'

export const groupLocalService = {
    createGroup,
    deleteGroup,
    updateGroup,
}

async function createGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = [...board.groups, group]
    await boardService.update(boardToUpdate)
    return group
}

async function deleteGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.filter((g) => g._id !== group._id)
    await boardService.update(boardToUpdate)
}

async function updateGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? group : g
    )
    await boardService.update(boardToUpdate)
}
