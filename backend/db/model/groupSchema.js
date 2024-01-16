import { Schema } from 'mongoose'
import { dbUtil } from '../dbUtil.js'
import { TaskSchema } from './TaskSchema.js'

export const GroupSchema = new Schema(
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
        archivedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        tasks: {
            type: [TaskSchema],
            default: [],
        },
    },
    { _id: false } // Don't auto-assign _id to groups
)
