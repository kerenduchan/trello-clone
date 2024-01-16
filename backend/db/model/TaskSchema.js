import { Schema, SchemaTypes } from 'mongoose'
import { dbUtil } from '../dbUtil.js'
import User from './User.js'

// comments subfield of task
const commentSchema = new Schema(
    {
        _id: {
            type: String,
            required: [true, 'id is required'],
        },
        text: {
            type: String,
            default: '',
        },
        createdBy: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'createdBy is required'],
            validate: {
                validator: async function (userId) {
                    const user = await User.findById(userId)
                    return !!user
                },
                message: 'Invalid createdBy. User does not exist.',
            },
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { _id: false } // Don't auto-assign _id to comment
)

export const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
            validate: dbUtil.getStringLengthValidate('title', 1, 100),
        },
        _id: {
            type: String,
            required: [true, 'id is required'],
        },
        comments: {
            type: [commentSchema],
        },
        labelIds: {
            type: [String],
            default: [],
        },
        archivedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { _id: false } // Don't auto-assign _id to tasks
)
