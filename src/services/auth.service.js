import { userService } from './user.service'

export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function login({ username, password }) {
    const user = await userService.getByUsername(username)

    if (!user) {
        throw 'Incorrect username or password'
    }
    _saveLoggedinUser(user)
    return user
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function signup(user) {
    const savedUser = await userService.save(user)
    return login(savedUser)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}
