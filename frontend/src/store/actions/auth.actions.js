import { authService } from '../../services/auth/auth.service'
import { socketService } from '../../services/socket.service'

export { login, signup, logout }

async function login(user) {
    console.log('auth actions login', user)
    await authService.login(user)
    socketService.login()
}

async function signup(user) {
    await authService.signup(user)
}

async function logout() {
    await authService.logout()
    socketService.logout()
}
