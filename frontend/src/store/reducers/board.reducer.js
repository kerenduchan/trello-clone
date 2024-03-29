import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    boards: null,

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
            state.curBoard.activities.unshift(activity)
            return state
        },

        activityUpdated(state, action) {
            const { activity } = action.payload
            state.curBoard.activities = state.curBoard.activities.map((a) =>
                a._id === activity._id ? activity : a
            )
            return state
        },

        activityDeleted(state, action) {
            const { activity } = action.payload
            state.curBoard.activities = state.curBoard.activities.filter(
                (a) => a._id !== activity._id
            )
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
    groupCreated,
    groupDeleted,
    groupUpdated,
    taskCreated,
    taskDeleted,
    taskUpdated,
    activityCreated,
    activityUpdated,
    activityDeleted,
} = boardSlice.actions

export default boardSlice.reducer

// for useSelector in react components
export const selectAllBoards = (state) => state.board.boards
export const selectBoard = (state) => state.board.curBoard
export const selectFilteredBoard = (state) => state.board.filteredBoard
export const selectActivities = (state) => state.board?.curBoard?.activities

export const selectTaskActivities = createSelector(
    selectActivities,
    (_, taskId) => taskId,
    (allActivities, taskId) => {
        return allActivities?.filter((a) => a.taskId === taskId)
    }
)

export const selectTaskComments = createSelector(
    selectActivities,
    (_, taskId) => taskId,
    (allActivities, taskId) => {
        return allActivities?.filter(
            (a) => a.type === 'task-comment' && a.taskId === taskId
        )
    }
)

export const selectTaskActivitiesWithUser = createSelector(
    selectTaskActivities,
    (state) => state.board?.curBoard?.members,
    (taskActivities, members) => {
        if (!taskActivities) return []
        return taskActivities.map((a) => ({
            ...a,
            user: members.find((m) => m._id === a.userId),
        }))
    }
)
