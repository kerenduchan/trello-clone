import express from 'express'
import {
    getBoards,
    getBoard,
    getBoardActivities,
    createBoard,
    updateBoard,
    removeBoard,
} from './board.controller.js'
import { authenticate } from '../../middleware/auth.middleware.js'

const router = express.Router()

// get all boards
router.get('/', authenticate, getBoards)

// get board with all of its groups and tasks
router.get('/:boardId', authenticate, getBoard)

// get board activities
router.get('/:boardId/activity', authenticate, getBoardActivities)

// create board
router.post('/', authenticate, createBoard)

// update board
router.put('/:boardId', authenticate, updateBoard)

// delete board
router.delete('/:boardId', authenticate, removeBoard)

export const boardRoutes = router
