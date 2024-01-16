export const authUtilService = {
    getLoggedinUser,
    saveLoggedinUser,
    clearLoggedinUser,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
}

function clearLoggedinUser() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}
