import { activityUtilService } from '../../../services/activity/activity.util.service'
import { createActivity } from '../activity/activity.actions'

export { addComment }

async function addComment(hierarchy, comment) {
    const activity = {
        ...activityUtilService.getTaskActivity('task-comment', hierarchy),
        comment,
    }
    return createActivity(activity)
}
