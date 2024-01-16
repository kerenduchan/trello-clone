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

const checklistItemSchema = new Schema(
    {
        _id: {
            type: String,
            required: [true, 'id is required'],
        },
        title: {
            type: String,
            default: '',
        },
        isDone: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false } // Don't auto-assign _id)
)

const checklistSchema = new Schema(
    {
        _id: {
            type: String,
            required: [true, 'id is required'],
        },
        title: {
            type: String,
            default: '',
        },
        items: {
            type: [checklistItemSchema],
            default: [],
        },
    },
    { _id: false } // Don't auto-assign _id)
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
        description: {
            type: String,
            default: '',
        },
        dates: {
            type: SchemaTypes.Mixed, // TODO
        },
        attachments: {
            type: [SchemaTypes.Mixed], // TODO
        },
        memberIds: {
            type: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
            default: [],
            validate: {
                validator: async function (memberIds) {
                    // Validate that each member ID corresponds to an existing user
                    for (const memberId of memberIds) {
                        const user = await User.findById(memberId)
                        if (!user) {
                            return false // Validation fails if any author ID is not found
                        }
                    }
                    return true // All author IDs are valid
                },
                message: 'One or more authors do not exist.',
            },
        },

        checklists: {
            type: [checklistSchema],
            default: [],
        },
        cover: {
            type: SchemaTypes.Mixed, // TODO
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
    { _id: false } // Don't auto-assign _id
)
