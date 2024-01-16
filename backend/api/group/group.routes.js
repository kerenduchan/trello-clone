import express from 'express'
import {
    getGroup,
    createGroup,
    updateGroup,
    removeGroup,
} from './group.controller.js'
import { authenticate } from '../../middleware/auth.middleware.js'

const router = express.Router()

// get group from board
router.get('/:boardId/group/:groupId', authenticate, getGroup)

// create group in board
router.post('/:boardId/group', authenticate, createGroup)

// update group in board
router.put('/:boardId/group/:groupId', authenticate, updateGroup)

// delete group
router.delete('/:boardId/group/:groupId', authenticate, removeGroup)

export const groupRoutes = router
