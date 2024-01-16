import { utilService } from '../../services/util.service.js'
import Board from '../../db/model/Board.js'
import { ObjectId } from 'mongodb'
import { labelService } from '../../services/label.service.js'

export const boardService = {
    query,
    getById,
    remove,
    create,
    update,
    getDefaultLabels,
}

// board fields that can be set upon creation. creatorId is set by board.controller.
const CREATE_FIELDS = ['title', 'style', 'creatorId']

// board fields that can be updated
const UPDATE_FIELDS = [
    'title',
    'style',
    'isStarred',
    'isArchived',
    'labels',
    'memberIds',
]

// query boards (with filter, sort, pagination) and populate the creator of each
// board
async function query(
    filterBy,
    sortBy,
    sortDir = 1,
    pageIdx = undefined,
    pageSize = 5
) {
    const criteria = _buildCriteria(filterBy)
    const totalCount = await Board.countDocuments(criteria)

    // lookup, project, and filter
    const pipeline = [
        {
            $lookup: {
                from: 'users',
                localField: 'creatorId',
                foreignField: '_id',
                as: 'creator',
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'memberIds',
                foreignField: '_id',
                as: 'members',
            },
        },
        {
            $unwind: '$creator',
        },
        {
            $project: {
                title: 1,
                description: 1,
                severity: 1,
                labels: 1,
                createdAt: 1,
                memberIds: 1,
                creator: {
                    _id: 1,
                    username: 1,
                    fullname: 1,
                    imgUrl: 1,
                },
                members: {
                    _id: 1,
                    username: 1,
                    fullname: 1,
                    imgUrl: 1,
                },
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

    // pagination
    if (pageIdx !== undefined) {
        const startIdx = pageIdx * pageSize
        pipeline.push({ $skip: startIdx }, { $limit: pageSize })
    }

    try {
        const boards = await Board.aggregate(pipeline).exec()
        return { data: boards, totalCount }
    } catch (err) {
        throw err
    }
}

async function getById(boardId) {
    try {
        const dbBoard = await Board.findById(boardId)
            .populate({
                path: 'creatorId',
                select: 'username fullname',
            })
            .populate({
                path: 'memberIds',
                select: 'username fullname',
            })
            .exec()
        if (!dbBoard) {
            throw `Board not found`
        }

        return _toObject(dbBoard)
    } catch (err) {
        _handleError(err)
    }
}

async function remove(boardId) {
    try {
        // TODO: remove all the lists and tasks of the board before removing the board
        const { deletedCount } = await Board.deleteOne({ _id: boardId })
        return { deletedCount }
    } catch (err) {
        _handleError(err)
    }
}

async function create(board) {
    // disregard unexpected fields
    board = utilService.extractFields(board, CREATE_FIELDS)

    // TODO: validation on the style field

    // board starts off with one member, the creator
    board.memberIds = [board.creatorId]

    try {
        const dbBoard = await Board.create(board)
        return getById(dbBoard._id)
    } catch (err) {
        _handleError(err)
    }
}

async function update(boardId, board) {
    // disregard unexpected fields
    board = utilService.extractFields(board, UPDATE_FIELDS)
    const options = { new: true, runValidators: true }

    // archivedAt - Pass isArchived=true to set archivedAt to now.
    // Pass isArchived=false to set archivedAt to null.
    if (board.isArchived) {
        board.archivedAt = Date.now()
        delete board.isArchived
    } else if (board.isArchived === false) {
        board.archivedAt = null
        delete board.isArchived
    }

    try {
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId },
            board,
            options
        )
            .populate({
                path: 'creatorId',
                select: 'username fullname',
            })
            .populate({
                path: 'memberIds',
                select: 'username fullname',
            })
            .exec()
        return _toObject(updatedBoard)
    } catch (err) {
        _handleError(err)
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    // get only boards that the logged in user is a member of
    if (filterBy.loggedinUserId) {
        const memberToFind = new ObjectId(filterBy.loggedinUserId)
        criteria.memberIds = {
            $elemMatch: { $eq: memberToFind },
        }
    }

    return criteria
}

// return the board as an object, excluding the version field
function _toObject(dbBoard) {
    const obj = dbBoard.toObject({
        versionKey: false,
    })

    if (typeof obj.creatorId === 'object') {
        // move the populated creatorId into the creator field
        obj.creator = obj.creatorId
        obj.creatorId = obj.creator._id
    }

    if (obj.creator) {
        delete obj.creator.createdAt
        delete obj.creator.id
    }

    if (obj.memberIds) {
        obj.members = obj.memberIds
        delete obj.memberIds
    }

    delete obj.id
    return obj
}

// don't expose the DB - formulate our own error messages
function _handleError(err) {
    utilService.handleDbError(err)
}

function getDefaultLabels() {
    const defaultColorIds = [
        'green',
        'yellow',
        'orange',
        'red',
        'purple',
        'blue',
    ]

    return defaultColorIds.map((colorId, idx) => {
        const color = labelService.getLabelColorById(colorId)

        return {
            _id: `l10${idx + 1}`,
            title: '',
            colorId,
            color,
        }
    })
}