import { authService } from './auth.service.js'
import { loggerService } from './../../services/logger.service.js'

export async function login(req, res) {
    const { username, password } = req.body
    try {
        await _login(username, password, res)
    } catch (err) {
        _handleError(res, err)
    }
}

export async function signup(req, res) {
    try {
        const credentials = req.body
        const account = await authService.signup(credentials)
        loggerService.debug(
            `auth.route - new account created: ` + JSON.stringify(account)
        )
        await _login(credentials.username, credentials.password, res)
    } catch (err) {
        _handleError(res, err)
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        _handleError(res, err)
    }
}

// used by login and signup
async function _login(username, password, res) {
    if (typeof password !== 'string') {
        throw 'password must be a string'
    }
    const user = await authService.login(username, password)
    const loginToken = authService.getLoginToken(user)
    loggerService.info('User login: ', user)
    res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })
    res.json(user)
}

function _handleError(res, err) {
    err = typeof err === 'string' ? { error: err } : err

    loggerService.error(err)
    res.status(400).send(err)
}
