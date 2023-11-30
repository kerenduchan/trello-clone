export const SET_NEW_CHECKLIST = 'SET_NEW_CHECKLIST'

const initialState = {
    // The ID of a newly created checklist, in which the "Add checklist item"
    // for should be open.
    newChecklistId: null,
}

// Objects in action MUST NOT contain pointers to the current state.
// New state can contain pointers to prev state's objects as long as they
// are not mutated at any point.
export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_NEW_CHECKLIST:
            return {
                newChecklistId: action.checklistId,
            }

        default:
            return state
    }
}
