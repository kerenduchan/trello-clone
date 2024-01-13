import { boardService } from './board.service'

export const groupLocalService = {
    createGroup,
    deleteGroup,
    updateGroup,
}

async function createGroup(boardId, group) {
    const board = await boardService.getById(boardId)
    board.groups.push(group)
    await boardService.save(board)
    return group
}

async function deleteGroup(boardId, groupId) {
    const board = await boardService.getById(boardId)
    board.groups = board.groups.filter((g) => g._id !== groupId)
    await boardService.save(board)
}

async function updateGroup(boardId, group) {
    const board = await boardService.getById(boardId)
    board.groups = board.groups.map((g) => (g._id === group._id ? group : g))
    await boardService.save(board)
}
