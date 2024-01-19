import { store } from '../../store'
import {
    activityCreated,
    activityDeleted,
    activityUpdated,
} from '../../reducers/board.reducer'
import { activityService } from '../../../services/activity/activity.service'

export { createActivity, updateActivity, deleteActivity }

async function createActivity(activity) {
    try {
        // optimistic update
        store.dispatch(activityCreated({ activity }))
        await activityService.create(activity)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function updateActivity(activity) {
    try {
        // optimistic update
        store.dispatch(activityUpdated({ activity }))
        await activityService.update(activity)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function deleteActivity(activity) {
    try {
        // optimistic update
        store.dispatch(activityDeleted({ activity }))
        await activityService.remove(activity._id)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}
