import { userService } from '../user/user.service'
import { authUtilService } from './auth.util.service'

export const authLocalService = {
    login,
    logout,
    signup,
}

async function login({ username, password }) {
    const user = await userService.getByUsername(username)

    if (!user) {
        throw 'Incorrect username or password'
    }
    authUtilService.saveLoggedinUser(user)
    return user
}

async function logout() {
    authUtilService.clearLoggedinUser()
}

async function signup(user) {
    const savedUser = await userService.save(user)
    return login(savedUser)
}
