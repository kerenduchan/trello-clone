import express from 'express'
import { getActivities } from './activity.controller.js'
import { authenticate } from '../../middleware/auth.middleware.js'

const router = express.Router()

// get activities for the given board
// TODO: authorization
router.get('/', authenticate, getActivities)

export const activityRoutes = router
