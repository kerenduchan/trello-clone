import { storageService } from '../async-storage.service'
import { activityUtilService } from './activity.util.service'

export const activityLocalService = { query, createComment }

const STORAGE_KEY = 'activities'

async function query(filter) {
    const allActivities = await storageService.query(STORAGE_KEY)
    const boardId = { filter }
    const activities = allActivities.filter((a) => a.boardId === boardId)
    return activities
}

async function createComment(hierarchy, comment) {
    const activity = activityUtilService.getActivityCreateComment(
        hierarchy,
        comment
    )
    return await storageService.post(STORAGE_KEY, activity)
}
