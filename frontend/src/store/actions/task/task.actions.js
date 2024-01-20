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
    const hierarchy = { board, group, task }
    try {
        // optimistic update
        store.dispatch(taskCreated({ board, group, position, task }))

        // mimic what the server does upon create task
        const activity = activityUtilService.taskCreated(hierarchy)
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

        // mimic what the server does upon delete task
        const activity = activityUtilService.taskDeleted(hierarchy)
        store.dispatch(activityCreated({ activity }))

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

        // mimic what the server does upon update task
        _createActivityForUpdateTask(hierarchy, fieldsToUpdate)

        await taskService.updateTask(board, group, updatedTask)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

function _createActivityForUpdateTask(hierarchy, fieldsToUpdate) {
    let activity
    if ('archivedAt' in fieldsToUpdate) {
        if (fieldsToUpdate.archivedAt === null) {
            activity = activityUtilService.taskUnarchived(hierarchy)
        } else {
            activity = activityUtilService.taskArchived(hierarchy)
        }
    }
    if (activity) {
        store.dispatch(activityCreated({ activity }))
    }
}
