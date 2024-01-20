import { Schema, model, SchemaTypes } from 'mongoose'
import User from './User.js'

// TODO - tighten the schema
const activitySchema = new Schema(
    {
        _id: String,

        userId: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'userId is required'],
            validate: {
                validator: async function (userId) {
                    const user = await User.findById(userId)
                    return !!user
                },
                message: 'Invalid userId. User does not exist.',
            },
        },

        type: {
            type: String,
            required: [true, 'type is required'],
        },

        boardId: SchemaTypes.ObjectId,
        groupId: String,
        taskId: String,

        data: {
            type: SchemaTypes.Mixed, // TODO
        },

        performedAt: {
            type: Date,
        },
    },
    { _id: false } // Don't auto-assign _id
)

const Activity = model('Activity', activitySchema)
export default Activity
