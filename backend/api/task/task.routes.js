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
router.get('/:boardId/:groupId/:taskId', authenticate, getTask)

// create task in group in board
router.post('/:boardId/:groupId', authenticate, createTask)

// update task in the given group in the given board
router.put('/:boardId/:groupId/:taskId', authenticate, updateTask)

// delete task from the given group in the given board
router.delete('/:boardId/:groupId/:taskId', authenticate, deleteTask)

export const taskRoutes = router
