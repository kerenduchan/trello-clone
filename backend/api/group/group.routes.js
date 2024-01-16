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
router.get('/:boardId/:groupId', authenticate, getGroup)

// create group in board
router.post('/:boardId', authenticate, createGroup)

// update group in board
router.put('/:boardId/:groupId', authenticate, updateGroup)

// delete group
router.delete('/:boardId/:groupId', authenticate, removeGroup)

export const groupRoutes = router
