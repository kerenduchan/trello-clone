import io from 'socket.io-client'
import { userService } from './user.service'

const SOCKET_URL = 'http://localhost:4000'

export const socketService = _createSocketService()

function _createSocketService() {
    console.log('create socket service')
    let socket = null
    const service = {
        connect() {
            // Connect to the server and login
            socket = io(SOCKET_URL)
            socket.emit('login', userService.getLoggedinUser())
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
