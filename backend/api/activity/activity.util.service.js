import { ObjectId } from 'mongodb'
import { activityService } from '../activity/activity.service.js'

export const activityUtilService = { taskCreated }

async function taskCreated(board, group, task) {
    // create an activity recording this task creation
    const activity = {
        _id: new ObjectId(),
        type: 'create-task',
        userId: task.creatorId,
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        data: {
            taskTitle: task.title,
            groupTitle: group.title,
        },
        performedAt: task.createdAt,
    }
    console.log(activity)
    return activityService.create(activity)
}
