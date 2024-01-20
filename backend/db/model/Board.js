import { Schema, model, SchemaTypes } from 'mongoose'
import { dbUtil } from '../dbUtil.js'
import User from './User.js'
import { boardService } from '../../api/board/board.service.js'
import { groupSchema } from './groupSchema.js'

// style subfield of board
const styleSchema = new Schema({
    backgroundImage: {
        type: String,
        default: '',
    },
})

// labels subfield of board
const labelSchema = new Schema({
    _id: String,
    title: {
        type: String,
        default: '',
    },
    colorId: {
        type: String,
    },
    color: {
        bgColor: {
            type: String,
        },
        textColor: {
            type: String,
        },
        colorName: {
            type: String,
        },
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
    isLabelsZoomedIn: {
        type: Boolean,
        default: false,
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
        type: [groupSchema],
        required: true,
        default: [],
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
