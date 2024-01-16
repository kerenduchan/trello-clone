import express from 'express'
import {
    createUser,
    getUser,
    getUsers,
    removeUser,
    updateUser,
} from './user.controller.js'
import {
    authenticateAdmin,
    authenticateAdminOrSelf,
    authorizeCreateOrUpdateUser,
} from '../../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', authenticateAdmin, getUsers)
router.get('/:userId', authenticateAdminOrSelf, getUser)
router.delete('/:userId', authenticateAdmin, removeUser)
router.post('/', authenticateAdmin, createUser)
router.put(
    '/:userId',
    authenticateAdminOrSelf,
    authorizeCreateOrUpdateUser,
    updateUser
)

export const userRoutes = router
