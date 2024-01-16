import { Schema, model, SchemaTypes } from 'mongoose'
import { dbUtil } from '../dbUtil.js'
import User from './User.js'
import { boardService } from '../../api/board/board.service.js'
import { utilService } from '../../services/util.service.js'
import { GroupSchema } from './GroupSchema.js'

// style subfield of board
const styleSchema = new Schema({
    backgroundImage: {
        type: String,
        default: '',
    },
})

// labels subfield of board
const labelSchema = new Schema({
    _id: SchemaTypes.ObjectId,
    title: {
        type: String,
        default: '',
    },
    color: {
        type: String,
        required: [true, 'color is required'],
        validate: {
            validator: utilService.isValidHexColor,
            message:
                'Invalid color hex code format. It should be in the format #RRGGBB.',
        },
    },
    colorName: {
        type: String,
        required: [true, 'colorName is required'],
    },
})

const boardSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title is required'],
        validate: dbUtil.getStringLengthValidate('title', 1, 100),
    },
    isStarred: {
        type: Boolean,
        default: false,
    },
    labels: {
        type: [labelSchema],
        default: boardService.getDefaultLabels(),
    },
    archivedAt: {
        type: Date,
        default: null,
    },
    creatorId: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: [true, 'creatorId is required'],
        validate: {
            validator: async function (userId) {
                const user = await User.findById(userId)
                return !!user
            },
            message: 'Invalid creatorId. User does not exist.',
        },
    },
    memberIds: {
        type: [SchemaTypes.ObjectId],
        ref: 'User',
        required: [true, 'memberIds is required'],
        validate: {
            validator: async function (memberIds) {
                const usersCount = await User.countDocuments({
                    _id: { $in: memberIds },
                })
                return usersCount === memberIds.length
            },
            message: 'One or more memberIds do not reference valid users.',
        },
    },
    groups: {
        type: [GroupSchema],
    },
    style: {
        type: styleSchema,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Board = model('Board', boardSchema)
export default Board
