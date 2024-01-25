import { Server } from 'socket.io'
import { authService } from '../api/auth/auth.service.js'

const SOCKET_IO_PORT = 4000

let _io

export function setupSocketAPI(http) {
    const _io = new Server(http, {
        cors: {
            origin: '*',
        },
    })
    _io.listen(SOCKET_IO_PORT)
    console.log('Socket IO listening on port ' + SOCKET_IO_PORT)

    _io.on('connection', (socket) => {
        socket.on('disconnect', () => {})

        socket.on('login', (loginToken) => {
            try {
                const loggedinUser = authService.validateToken(loginToken)
                socket.user = loggedinUser
            } catch (err) {
                console.error(err)
            }
        })

        socket.on('board-updated', (boardId) => {
            // Broadcast the message to all clients except the sender
            socket.broadcast.emit('board-updated', boardId)
        })
    })
}
