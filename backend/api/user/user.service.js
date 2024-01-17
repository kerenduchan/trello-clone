import { utilService } from '../../services/util.service.js'
import { loggerService } from '../../services/logger.service.js'
import User from '../../db/model/User.js'
import Board from '../../db/model/Board.js'

export const userService = {
    query,
    getById,
    getByUsername,
    remove,
    create,
    update,
}

// user fields that can be set/updated
const FIELDS = ['username', 'fullname', 'password', 'isAdmin', 'imgUrl']

async function query(
    filterBy,
    sortBy,
    sortDir = 1,
    pageIdx = undefined,
    pageSize = 5
) {
    const criteria = _buildCriteria(filterBy)
    const totalCount = await User.countDocuments(criteria)

    // lookup, project, and filter
    const pipeline = [
        {
            $match: criteria,
        },
        {
            $lookup: {
                from: 'boards',
                localField: '_id',
                foreignField: 'creatorId',
                as: 'boards',
            },
        },
        {
            $project: {
                _id: 1,
                username: 1,
                fullname: 1,
                isAdmin: 1,
                createdAt: 1,
                boardCount: { $size: '$boards' },
            },
        },
    ]

    // sort
    if (sortBy) {
        pipeline.push({ $sort: { [sortBy]: sortDir } })
    }

    // pagination
    if (pageIdx !== undefined) {
        const startIdx = pageIdx * pageSize
        pipeline.push({ $skip: startIdx }, { $limit: pageSize })
    }

    try {
        const users = await User.aggregate(pipeline).exec()
        return { data: users, totalCount }
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const dbUser = await User.findById(userId).exec()

        // Count boards for the user
        const boardCount = await Board.countDocuments({ creatorId: userId })

        if (!dbUser) {
            return null
        }
        return { ..._toObject(dbUser), boardCount }
    } catch (err) {
        _handleError(err)
    }
}

async function getByUsername(username) {
    try {
        const dbUser = await User.findOne({ username }).exec()
        if (!dbUser) {
            return null
        }
        return _toObject(dbUser, false)
    } catch (err) {
        loggerService.error(err)
        throw err
    }
}

async function remove(userId) {
    try {
        // don't allow removing a user that has boards
        const boardCount = await Board.countDocuments({ creatorId: userId })

        if (boardCount > 0) {
            throw `User cannot be removed. ${boardCount} board(s) are associated with the user.`
        }

        const { deletedCount } = await User.deleteOne({ _id: userId })
        return { deletedCount }
    } catch (err) {
        _handleError(err)
    }
}

async function create(user) {
    if (typeof user.password !== 'string') {
        throw 'password must be a string'
    }

    // disregard unexpected fields
    user = utilService.extractFields(user, FIELDS)

    try {
        const dbUser = await User.create(user)
        return _toObject(dbUser)
    } catch (err) {
        _handleError(err)
    }
}

async function update(userId, user) {
    // disregard unexpected fields
    user = utilService.extractFields(user, FIELDS)

    if (user.password !== undefined && typeof user.password !== 'string') {
        throw 'password must be a string'
    }

    const options = { new: true, runValidators: true }
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            user,
            options
        ).exec()
        return _toObject(updatedUser)
    } catch (err) {
        _handleError(err)
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt && filterBy.txt.length > 0) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria,
            },
            {
                fullname: txtCriteria,
            },
        ]
    }
    return criteria
}

// return the user as an object, excluding the password and version fields
function _toObject(dbUser, deletePassword = true) {
    const obj = dbUser.toObject({
        versionKey: false,
    })

    if (deletePassword) delete obj.password
    delete obj.id
    return obj
}

// don't expose the DB - formulate our own error messages
function _handleError(err) {
    if (err.code === 11000 && err.keyPattern.username) {
        throw `Username already taken`
    }

    utilService.handleDbError(err)
}
