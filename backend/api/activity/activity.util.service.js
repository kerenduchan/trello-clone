import { ObjectId } from 'mongodb'
import { activityService } from '../activity/activity.service.js'

export const activityUtilService = { taskCreated, taskDeleted }

async function taskCreated(board, group, task) {
    const activity = {
        _id: new ObjectId(),
        type: 'task-created',
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
    return activityService.create(activity)
}

async function taskDeleted(userId, board, group, task) {
    const activity = {
        _id: new ObjectId(),
        type: 'task-deleted',
        userId,
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        data: {
            taskTitle: task.title,
            groupTitle: group.title,
        },
        performedAt: Date.now(),
    }
    return activityService.create(activity)
}
