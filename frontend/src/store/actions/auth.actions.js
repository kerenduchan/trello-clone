import { authService } from '../../services/auth/auth.service'
import { socketService } from '../../services/socket.service'

export { login, signup, logout }

async function login(user) {
    const res = await authService.login(user)
    socketService.login()
    return res
}

async function signup(user) {
    return await authService.signup(user)
}

async function logout() {
    await authService.logout()
    socketService.logout()
}
