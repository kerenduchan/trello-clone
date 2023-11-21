import { boardService } from '../../services/board.service'
import {
    SET_BOARDS,
    SET_BOARD,
    ADD_BOARD,
    REMOVE_BOARD,
    UPDATE_BOARD,
} from '../reducers/board.reducer'
import { store } from '../store'

export { loadBoards, loadBoard, removeBoard, saveBoard }

async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.error('Failed to load boards:', err)
        throw err
    }
}

async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error('Failed to load board:', err)
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
        const type = board._id ? UPDATE_BOARD : ADD_BOARD
        const boardToSave = await boardService.save(board)
        store.dispatch({ type, board: boardToSave })
        return boardToSave
    } catch (err) {
        console.error('Failed to save board:', err)
        throw err
    }
}
