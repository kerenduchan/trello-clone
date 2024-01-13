import { boardService } from './board.service'

export const taskLocalService = {
    createTask,
    deleteTask,
}

async function createTask(boardId, groupId, position, task) {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((g) => g._id === groupId)
    group.tasks.splice(position, 0, task)
    await boardService.save(board)
}

async function deleteTask(boardId, groupId, taskId) {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((g) => g._id === groupId)
    group.tasks = group.tasks.filter((t) => t._id !== taskId)
    await boardService.save(board)
}
