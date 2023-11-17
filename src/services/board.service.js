import { storageService } from './async-storage.service'

export const boardService = {
    getBoards,
    getBoardById,
    createBoard,
}

const BOARD_DB_KEY = 'boards'

async function getBoards() {
    return await storageService.query(DB_KEY)
}

async function getBoardById(_id) {
    return await storageService.query(DB_KEY, _id)
}

async function createBoard(board) {
    return await storageService.post(DB_KEY, board)
}
