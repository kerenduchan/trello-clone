import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // The ID of the checklist, in which the "Add checklist item"
    // form should be open. Only one checklist form / checklist item form
    // should be open at a time.
    curChecklistId: null,

    // The one and only checklist item whose form is currently open.
    // Only one checklist form / checklist item form should be open at a time.
    curChecklistItemId: null,

    loggedinUser: null,

    dragUpdateInfo: null,
}

// "mutating" code is okay inside of createSlice!
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        loggedinUserChanged(state, action) {
            return {
                ...state,
                loggedinUser: action.payload,
            }
        },

        curChecklistChanged(state, action) {
            return {
                ...state,
                curChecklistId: action.payload,
                curChecklistItemId: null,
            }
        },
        curChecklistItemChanged(state, action) {
            return {
                ...state,
                curChecklistId: null,
                curChecklistItemId: action.payload,
            }
        },
        dragUpdateInfoChanged(state, action) {
            const dragUpdateInfo = action.payload
            return {
                ...state,
                dragUpdateInfo,
            }
        },
    },
})

export const {
    loggedinUserChanged,
    curChecklistChanged,
    curChecklistItemChanged,
    dragUpdateInfoChanged,
} = appSlice.actions
export default appSlice.reducer

export const selectChecklistId = (state) => state.app.curChecklistId
export const selectChecklistItemId = (state) => state.app.curChecklistItemId
export const selectLoggedinUser = (state) => state.app.loggedinUser
export const selectDragUpdateInfo = (state) => state.app.dragUpdateInfo
