import { storageService } from '../async-storage.service'

export const activityLocalService = {
    query,
    create,
    update,
    remove,
}

const STORAGE_KEY = 'activities'

async function query(filter) {
    const allActivities = await storageService.query(STORAGE_KEY)
    const { boardId } = filter
    const activities = allActivities.filter((a) => a.boardId === boardId)
    activities.sort((a1, a2) => (a1.performedAt < a2.performedAt ? 1 : -1))
    return activities
}

async function create(activity) {
    return await storageService.post(STORAGE_KEY, activity)
}

async function update(activity) {
    let updatedActivity = activity
    if (activity.type === 'task-comment') {
        updatedActivity = { ...activity }
        updatedActivity.comment = { ...activity.comment }
        updatedActivity.comment.isEdited = true
    }
    return storageService.put(STORAGE_KEY, updatedActivity)
}

async function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}
