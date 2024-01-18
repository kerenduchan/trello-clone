import Activity from '../../db/model/Activity.js'

export const activityService = {
    query,
}

async function query(filterBy, sortBy, sortDir = 1) {
    console.log('activities query', filterBy)
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
                actionType: 1,
                actionInfo: 1,
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

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.boardId) {
        criteria.boardId = filterBy.boardId
    }
    return criteria
}
