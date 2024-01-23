import io from 'socket.io-client'
import { authService } from './auth/auth.service.js'
import { authUtilService } from './auth/auth.util.service.js'

const SOCKET_URL = 'http://localhost:4000'

export const socketService = _createSocketService()

socketService.connect()

function _createSocketService() {
    console.log('create socket service')
    let socket = null
    const service = {
        connect() {
            // Connect to the server and login
            socket = io(SOCKET_URL)
            const user = authService.getLoggedinUser()
            if (user) this.login(user)
        },

        login() {
            const loginToken = authUtilService.getLoginTokenFromCookies()
            socket.emit('login', loginToken)
        },
        logout() {
            socket.emit('logout')
        },
        disconnect() {
            // Logout and disconnect from the server
            socket.emit('logout')
            socket.disconnect()
        },

        onMessage(cb) {
            socket.on('message', cb)
        },

        sendMessage(msg) {
            socket.emit('message', msg)
        },
    }
    return service
}
