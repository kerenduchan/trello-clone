import { authService } from '../../services/auth/auth.service'

export { login, signup, logout }

async function login(user) {
    await authService.login(user)
}

async function signup(user) {
    await authService.signup(user)
}

async function logout() {
    await authService.logout()
}
