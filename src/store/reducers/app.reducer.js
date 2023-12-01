export const SET_CUR_CHECKLIST = 'SET_CUR_CHECKLIST'
export const SET_CUR_CHECKLIST_ITEM = 'SET_CUR_CHECKLIST_ITEM'

const initialState = {
    // The ID of the checklist, in which the "Add checklist item"
    // form should be open. Only one checklist form / checklist item form
    // should be open at a time.
    curChecklistId: null,

    // The one and only checklist item whose form is currently open.
    // Only one checklist form / checklist item form should be open at a time.
    curChecklistItemId: null,
}

// Objects in action MUST NOT contain pointers to the current state.
// New state can contain pointers to prev state's objects as long as they
// are not mutated at any point.
export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_CUR_CHECKLIST:
            return {
                curChecklistId: action.checklistId,
                curChecklistItemId: null,
            }
        case SET_CUR_CHECKLIST_ITEM:
            return {
                curChecklistId: null,
                curChecklistItemId: action.checklistId,
            }

        default:
            return state
    }
}
