import { activityService } from '../activity/activity.service'
import { activityUtilService } from '../activity/activity.util.service'
import { boardService } from '../board/board.service'

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
    await boardService.update(boardToUpdate)

    // TODO: performedAt should be taken from the task's creation time
    const activity = activityUtilService.buildCreateTaskActivity(
        board,
        group,
        task,
        Date.now()
    )
    await activityService.create(activity)
}

async function deleteTask(hierarchy) {
    const { board, group, task } = hierarchy
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? groupToUpdate : g
    )
    await boardService.update(boardToUpdate)
}

async function updateTask(board, group, task) {
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.map((t) =>
        t._id === task._id ? task : t
    )
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? groupToUpdate : g
    )
    await boardService.update(boardToUpdate)
}
