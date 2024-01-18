import Activity from '../../db/model/Activity.js'

export const activityService = {
    query,
    create,
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
    try {
        const dbActivity = await Activity.create(activity)
        return dbActivity
    } catch (err) {
        _handleError(err)
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
