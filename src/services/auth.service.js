export const authService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

async function login(user) {
    _saveLoggedinUser(user)
}

async function logout() {}

async function signup(user) {}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}
