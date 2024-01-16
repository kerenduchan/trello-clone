import { boardService } from './../board/board.service'

export const groupLocalService = {
    createGroup,
    deleteGroup,
    updateGroup,
}

async function createGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = [...board.groups, group]
    await boardService.save(boardToUpdate)
    return group
}

async function deleteGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.filter((g) => g._id !== group._id)
    await boardService.save(boardToUpdate)
}

async function updateGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? group : g
    )
    await boardService.save(boardToUpdate)
}
