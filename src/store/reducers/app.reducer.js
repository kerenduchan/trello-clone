import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // The ID of the checklist, in which the "Add checklist item"
    // form should be open. Only one checklist form / checklist item form
    // should be open at a time.
    curChecklistId: null,

    // The one and only checklist item whose form is currently open.
    // Only one checklist form / checklist item form should be open at a time.
    curChecklistItemId: null,
}

// "mutating" code is okay inside of createSlice!
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        curChecklistChanged(state, action) {
            return {
                curChecklistId: action.payload,
                curChecklistItemId: null,
            }
        },
        curChecklistItemChanged(state, action) {
            return {
                curChecklistId: null,
                curChecklistItemId: action.payload,
            }
        },
    },
})

export const { curChecklistChanged, curChecklistItemChanged } = appSlice.actions
export default appSlice.reducer
