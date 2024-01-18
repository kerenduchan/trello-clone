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

        groupCreated(state, action) {
            const { group } = action.payload
            state.curBoard.groups.push(group)
            return state
        },

        groupDeleted(state, action) {
            const { group } = action.payload
            state.curBoard.groups = state.curBoard.groups.filter(
                (g) => g._id !== group._id
            )
            return state
        },

        groupUpdated(state, action) {
            const { group } = action.payload
            state.curBoard.groups = state.curBoard.groups.map((g) =>
                g._id === group._id ? group : g
            )
            return state
        },

        taskCreated(state, action) {
            const { group, position, task } = action.payload
            const groupToUpdate = state.curBoard.groups.find(
                (g) => g._id === group._id
            )
            groupToUpdate.tasks.splice(position, 0, task)
            return state
        },

        taskDeleted(state, action) {
            const { group, task } = action.payload
            const groupToUpdate = state.curBoard.groups.find(
                (g) => g._id === group._id
            )
            groupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)
            return state
        },

        taskUpdated(state, action) {
            const { group, task } = action.payload
            const groupToUpdate = state.curBoard.groups.find(
                (g) => g._id === group._id
            )
            groupToUpdate.tasks = group.tasks.map((t) =>
                t._id === task._id ? task : t
            )
            return state
        },

        activityCreated(state, action) {
            const { activity } = action.payload
            state.curBoard.activities.push(activity)
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
    groupCreated,
    groupDeleted,
    groupUpdated,
    taskCreated,
    taskDeleted,
    taskUpdated,
    activityCreated,
} = boardSlice.actions

export default boardSlice.reducer

// for useSelector in react components
export const selectAllBoards = (state) => state.board.boards
export const selectBoard = (state) => state.board.curBoard
export const selectFilteredBoard = (state) => state.board.filteredBoard
export const selectActivities = (state) => state.board.curBoard.activities
