import io from 'socket.io-client'
import { authService } from './auth/auth.service.js'
import { authUtilService } from './auth/auth.util.service.js'
import { loadBoard, loadBoards } from '../store/actions/board/board.actions.js'
import { store } from '../store/store.js'

const SOCKET_URL =
    process.env.NODE_ENV === 'production' ? '' : '//localhost:4000'

export const socketService = _createSocketService()

socketService.connect()

function _createSocketService() {
    let socket = null
    const service = {
        connect() {
            // Connect to the server and login
            socket = io(SOCKET_URL)
            const user = authService.getLoggedinUser()
            if (user) this.login()

            // Listen for incoming messages from the server
            socketService.onBoardUpdated((boardId) => {
                if (boardId === store.getState().board.curBoard?._id) {
                    loadBoard(boardId)
                }
                loadBoards()
            })
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

        onBoardUpdated(cb) {
            socket.on('board-updated', cb)
        },

        notifyBoardUpdated(boardId) {
            socket.emit('board-updated', boardId)
        },
    }
    return service
}
