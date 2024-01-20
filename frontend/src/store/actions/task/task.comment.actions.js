import { activityUtilService } from '../../../services/activity/activity.util.service'
import { createActivity } from '../activity/activity.actions'

export { addComment }

async function addComment(hierarchy, comment) {
    const activity = activityUtilService.getCommentActivity(hierarchy, comment)
    return createActivity(activity)
}
