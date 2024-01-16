import express from 'express'
import {
    getTask,
    createTask,
    updateTask,
    deleteTask,
} from './task.controller.js'
import { authenticate } from '../../middleware/auth.middleware.js'

const router = express.Router()

// get task from the given group from the given board
router.get('/:boardId/group/:groupId/task/:taskId', authenticate, getTask)

// create task in group in board
router.post('/:boardId/group/:groupId/task', authenticate, createTask)

// update task in the given group in the given board
router.put('/:boardId/group/:groupId/task/:taskId', authenticate, updateTask)

// delete task from the given group in the given board
router.delete('/:boardId/group/:groupId/task/:taskId', authenticate, deleteTask)

export const taskRoutes = router
