import { Schema } from 'mongoose'
import { dbUtil } from '../dbUtil.js'

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
        archivedAt: {
            type: Date,
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false } // Don't auto-assign _id to tasks
)
