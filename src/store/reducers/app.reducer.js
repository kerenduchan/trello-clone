export const SET_POPOVER = 'SET_POPOVER'

const initialState = {
    popover: null,
}

export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_POPOVER:
            return {
                ...state,
                popover: action.popover,
            }

        default:
            return state
    }
}
