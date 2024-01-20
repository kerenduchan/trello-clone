import { ObjectId } from 'mongodb'
import Activity from '../../db/model/Activity.js'
import { utilService } from '../../services/util.service.js'

export const activityService = {
    query,
    create,
    update,
    remove,
}

async function query(filterBy, sortBy, sortDir = 1) {
    const criteria = _buildCriteria(filterBy)

    const pipeline = [
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $project: {
                user: {
                    _id: 1,
                    username: 1,
                    fullname: 1,
                    imgUrl: 1,
                },
                boardId: 1,
                groupId: 1,
                taskId: 1,
                type: 1,
                info: 1,
                performedAt: 1,
            },
        },
        {
            $match: criteria,
        },
    ]

    // sort
    if (sortBy) {
        pipeline.push({ $sort: { [sortBy]: sortDir } })
    }

    try {
        const activities = await Activity.aggregate(pipeline).exec()
        return activities
    } catch (err) {
        throw err
    }
}

async function create(activity) {
    activity.userId = new ObjectId(activity.userId)

    try {
        const dbActivity = await Activity.create(activity)
        return dbActivity
    } catch (err) {
        utilService.handleDbError(err)
    }
}

async function update(activityId, fields) {
    const options = { new: true, runValidators: true }

    if (fields.type === 'task-comment') {
        fields.comment.isEdited = true
    }

    try {
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: activityId },
            fields,
            options
        )
            .populate({
                path: 'userId',
                select: 'username fullname imgUrl',
            })
            .exec()
        return updatedActivity
    } catch (err) {
        utilService.handleDbError(err)
    }
}

async function remove(activityId) {
    try {
        const { deletedCount } = await Activity.deleteOne({ _id: activityId })
        return { deletedCount }
    } catch (err) {
        utilService.handleDbError(err)
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.boardId) {
        criteria.boardId = filterBy.boardId
    }

    if (filterBy.groupId) {
        criteria.groupId = filterBy.groupId
    }

    if (filterBy.taskId) {
        criteria.taskId = filterBy.taskId
    }

    return criteria
}
