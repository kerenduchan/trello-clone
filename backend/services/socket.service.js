import { Server } from 'socket.io'

const SOCKET_IO_PORT = 4000

let _io

export function setupSocketAPI(http) {
    const _io = new Server(http, {
        cors: {
            origin: 'http://localhost:5173',
        },
    })
    _io.listen(SOCKET_IO_PORT)
    console.log('Socket IO listening on port ' + SOCKET_IO_PORT)

    _io.on('connection', (socket) => {
        console.log('A user connected', socket.id)

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id)
        })

        socket.on('login', (userId) => {
            console.log(`User logged in: ${userId}`)
            socket.userId = userId
        })

        socket.on('message', (text) => {
            console.log(`Received message from ${socket.userId}: ${text}`)
            const message = { _id: makeId(), userId: socket.userId, text }
            io.emit('message', message) // Broadcast the message to all connected clients
        })
    })
}
