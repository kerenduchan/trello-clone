import { boardService } from '../../services/board.service'
import {
    SET_BOARDS,
    ADD_BOARD,
    REMOVE_BOARD,
    UPDATE_BOARD,
} from '../reducers/board.reducer'
import { store } from '../store'

export { loadBoards, removeBoard, saveBoard }

async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.error('Failed to load boards:', err)
        throw err
    }
}

async function removeBoard(boardId) {
    try {
        store.dispatch({ type: REMOVE_BOARD, boardId })
        await boardService.remove(boardId)
    } catch (err) {
        console.error('Failed to remove board:', err)
        throw err
    }
}

async function saveBoard(board) {
    try {
        const type = board.id ? UPDATE_BOARD : ADD_BOARD
        const boardToSave = await boardService.save(board)
        store.dispatch({ type, board: boardToSave })
    } catch (err) {
        console.log('Failed to save board:', err)
        throw err
    }
}
