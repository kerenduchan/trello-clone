export const authUtilService = {
    getLoggedinUser,
    saveLoggedinUser,
    clearLoggedinUser,
    getLoginTokenFromCookies,
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

function getLoginTokenFromCookies() {
    const cookiesString = document.cookie
    const cookies = cookiesString.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=')
        acc[name] = value
        return acc
    }, {})
    return cookies.loginToken
}
