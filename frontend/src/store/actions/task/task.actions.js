import { store } from '../../store'
import {
    taskCreated,
    taskUpdated,
    taskDeleted,
    activityCreated,
} from '../../reducers/board.reducer'
import { activityUtilService } from '../../../services/activity/activity.util.service'
import { taskService } from '../../../services/task/task.service'

export { createTask, deleteTask, updateTask }

async function createTask(board, group, position, task) {
    try {
        // optimistic update
        store.dispatch(taskCreated({ board, group, position, task }))

        // mimic what the server does upon create task
        const activity = activityUtilService.buildCreateTaskActivity(
            board,
            group,
            task,
            Date.now()
        )

        store.dispatch(activityCreated({ activity }))

        await taskService.createTask(board, group, position, task)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function deleteTask(hierarchy) {
    try {
        // optimistic update
        store.dispatch(taskDeleted({ ...hierarchy }))
        await taskService.deleteTask(hierarchy)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function updateTask(hierarchy, fieldsToUpdate) {
    const { board, group, task } = hierarchy
    const updatedTask = { ...task, ...fieldsToUpdate }

    try {
        // optimistic update
        store.dispatch(taskUpdated({ board, group, task: updatedTask }))
        await taskService.updateTask(board, group, updatedTask)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}
