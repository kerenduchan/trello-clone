import { loggerService } from '../services/logger.service.js'
import { authService } from '../api/auth/auth.service.js'

export function authenticate(req, res, next) {
    const { loginToken } = req.cookies
    const loggedinUser = authService.validateToken(loginToken)
    if (!loggedinUser) return res.status(401).send({ error: 'Not logged in' })
    req.loggedinUser = loggedinUser
    next()
}

export function authenticateAdmin(req, res, next) {
    const { loginToken } = req.cookies
    const loggedinUser = authService.validateToken(loginToken)
    if (!loggedinUser) return res.status(401).send({ error: 'Not logged in' })

    if (!loggedinUser.isAdmin) {
        loggerService.warn(
            `${loggedinUser.username} tried to perform admin action`
        )
        return res.status(403).send({ error: 'Not authorized' })
    }
    req.loggedinUser = loggedinUser
    next()
}

export function authenticateAdminOrSelf(req, res, next) {
    const { loginToken } = req.cookies
    const loggedinUser = authService.validateToken(loginToken)
    if (!loggedinUser) return res.status(401).send({ error: 'Not logged in' })

    if (!loggedinUser.isAdmin && loggedinUser._id !== req.params.userId) {
        loggerService.warn(
            `${loggedinUser.username} tried to perform admin action`
        )
        return res.status(403).send({ error: 'Not authorized' })
    }
    req.loggedinUser = loggedinUser
    next()
}

// only an admin can set/update a user's isAdmin
export function authorizeCreateOrUpdateUser(req, res, next) {
    const { loginToken } = req.cookies
    const loggedinUser = authService.validateToken(loginToken)
    if (!loggedinUser) return res.status(401).send({ error: 'Not logged in' })

    if (!loggedinUser.isAdmin && req.body.isAdmin === true) {
        loggerService.warn(
            `${loggedinUser.username} tried to perform admin action`
        )
        return res.status(403).send({ error: 'Not authorized' })
    }
    req.loggedinUser = loggedinUser
    next()
}
