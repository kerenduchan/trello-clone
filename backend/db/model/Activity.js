import { Schema, model, SchemaTypes } from 'mongoose'
import User from './User.js'

// TODO - tighten the schema
const activitySchema = new Schema({
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
        required: [true, 'actionType is required'],
    },

    info: {
        type: SchemaTypes.Mixed, // TODO
    },

    performedAt: {
        type: Date,
    },
})

const Activity = model('Activity', activitySchema)
export default Activity
