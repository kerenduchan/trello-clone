import express from 'express'
import {
    createActivity,
    getActivities,
    removeActivity,
    updateActivity,
} from './activity.controller.js'
import { authenticate } from '../../middleware/auth.middleware.js'

const router = express.Router()

// TODO: authorization

// get activities for the given board
router.get('/', authenticate, getActivities)

// create activity
router.post('/', authenticate, createActivity)

// update activity
router.put('/:activityId', authenticate, updateActivity)

// // delete activity
router.delete('/:activityId', authenticate, removeActivity)

export const activityRoutes = router
