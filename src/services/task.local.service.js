import { boardService } from './board.service'

export const taskLocalService = {
    createTask,
    deleteTask,
    updateTask,
}

async function createTask(board, group, position, task) {
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = [...groupToUpdate.tasks]
    groupToUpdate.tasks.splice(position, 0, task)
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? groupToUpdate : g
    )
    await boardService.save(boardToUpdate)
}

async function deleteTask(hierarchy) {
    const { board, group, task } = hierarchy
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? groupToUpdate : g
    )
    await boardService.save(boardToUpdate)
}

async function updateTask(boardId, groupId, task) {
    const board = await boardService.getById(boardId)
    const group = board.groups.find((g) => g._id === groupId)
    group.tasks = group.tasks.map((t) => (t._id === task._id ? task : t))
    await boardService.save(board)
}
