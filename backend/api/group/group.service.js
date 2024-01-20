import Board from '../../db/model/Board.js'
import { utilService } from '../../services/util.service.js'
import { activityUtilService } from '../activity/activity.util.service.js'
import { boardService } from '../board/board.service.js'

export const groupService = {
    getById,
    create,
    update,
    remove,
}

// fields that can be set upon creation. Client sets the ID (for optimistic create).
const CREATE_FIELDS = ['title', '_id']

// fields that can be updated
const UPDATE_FIELDS = ['title', 'isArchived']

async function getById(boardId, groupId) {
    const board = await boardService.getById(boardId)
    if (!board) throw 'Board not found'

    const group = board.groups.find((g) => g._id === groupId)
    if (!group) throw 'Group not found'
    return group
}

async function create(userId, boardId, group) {
    // disregard unexpected fields
    group = utilService.extractFields(group, CREATE_FIELDS)

    // TODO: validation

    try {
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId },
            { $push: { groups: group } },
            { new: true }
        ).exec()

        if (!updatedBoard) {
            throw 'Board not found'
        }

        const updatedGroup = updatedBoard.groups[updatedBoard.groups.length - 1]
        await activityUtilService.groupCreated(
            userId,
            updatedBoard,
            updatedGroup
        )

        return
    } catch (err) {
        _handleError(err)
    }
}

async function update(boardId, groupId, fields) {
    // disregard unexpected fields
    fields = utilService.extractFields(fields, UPDATE_FIELDS)

    // TODO: validation

    // archivedAt - Pass isArchived=true to set archivedAt to now.
    // Pass isArchived=false to set archivedAt to null.
    if (fields.isArchived) {
        fields.archivedAt = Date.now()
    } else if (fields.isArchived === false) {
        fields.archivedAt = null
    }
    delete fields.isArchived

    // update only these fields, don't override all the fields of the group
    let fieldsToSet = {}
    Object.entries(fields).forEach(([key, value]) => {
        fieldsToSet[`groups.$.${key}`] = value
    })

    try {
        const updatedBoard = await Board.findOneAndUpdate(
            { _id: boardId, 'groups._id': groupId },
            { $set: fieldsToSet },
            { new: true }
        ).exec()

        const updatedGroup = updatedBoard.groups.find(
            (g) => g._id.toString() === groupId
        )
        return updatedGroup
    } catch (err) {
        _handleError(err)
    }
}

async function remove(boardId, groupId) {
    try {
        const result = await Board.updateOne(
            { _id: boardId },
            { $pull: { groups: { _id: groupId } } },
            { new: true }
        ).exec()
        return { deletedCount: result.modifiedCount }
    } catch (err) {
        _handleError(err)
    }
}

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

// don't expose the DB - formulate our own error messages
function _handleError(err) {
    utilService.handleDbError(err)
}
