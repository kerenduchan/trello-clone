import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    boards: [],

    // the full board, including filtered-out items and archived items
    curBoard: null,

    // the filtered board
    filteredBoard: null,

    prevState: null,
}

// "mutating" code is okay inside of createSlice!
const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        boardsChanged(state, action) {
            state.boards = action.payload
            return state
        },
        boardChanged(state, action) {
            state.curBoard = action.payload
            return state
        },
        filteredBoardChanged(state, action) {
            state.filteredBoard = action.payload
            return state
        },
        boardAdded(state, action) {
            state.boards.push(action.payload)
            return state
        },
        boardRemoved(state, action) {
            state.boards = state.boards.filter((b) => b._id !== action.payload)
            return state
        },
        boardUpdated(state, action) {
            const board = action.payload
            const idx = state.boards.findIndex((b) => b._id === board._id)
            state.boards[idx] = board

            if (state.curBoard?._id === board._id) {
                state.curBoard = board
            }
            return state
        },
        boardsUpdated(state, action) {
            const boardIdToBoardMap = {}
            for (const b of action.payload) {
                boardIdToBoardMap[b._id] = b
            }

            state.boards = state.boards.map((b) =>
                boardIdToBoardMap[b._id] ? boardIdToBoardMap[b._id] : b
            )

            const curBoardId = state.curBoard?._id
            if (boardIdToBoardMap[curBoardId]) {
                state.curBoard = boardIdToBoardMap[curBoardId]
            }
            return state
        },
    },
})

export const {
    boardsChanged,
    boardChanged,
    filteredBoardChanged,
    boardAdded,
    boardRemoved,
    boardUpdated,
    boardsUpdated,
} = boardSlice.actions

export default boardSlice.reducer

// for useSelector in react components
export const selectAllBoards = (state) => state.boardModule.boards
export const selectBoard = (state) => state.boardModule.curBoard
export const selectFilteredBoard = (state) => state.boardModule.filteredBoard
