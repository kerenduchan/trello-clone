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
        const activity = activityUtilService.getTaskActivity(
            'task-created',
            hierarchy
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

        // mimic what the server does upon delete task
        const activity = activityUtilService.getTaskActivity(
            'task-deleted',
            hierarchy
        )
        store.dispatch(activityCreated({ activity }))

        await taskService.deleteTask(hierarchy)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function updateTask(hierarchy, fieldsToUpdate, activity = null) {
    const { board, group, task } = hierarchy
    const updatedTask = { ...task, ...fieldsToUpdate }

    try {
        // optimistic update
        store.dispatch(taskUpdated({ board, group, task: updatedTask }))

        if (!activity) {
            // mimic what the server does upon update task
            activity = _createActivityForUpdateTask(hierarchy, fieldsToUpdate)
        }
        if (activity) {
            store.dispatch(activityCreated({ activity }))
        }

        await taskService.updateTask(board, group, task._id, fieldsToUpdate)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

function _createActivityForUpdateTask(hierarchy, fieldsToUpdate) {
    let type
    if ('archivedAt' in fieldsToUpdate) {
        type = fieldsToUpdate.archivedAt ? 'task-archived' : 'task-unarchived'
    }

    if (type) {
        return activityUtilService.getTaskActivity(type, hierarchy)
    }
}
