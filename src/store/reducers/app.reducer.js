export const SET_MODAL = 'SET_MODAL'

const initialState = {
    modal: null,
}

export function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_MODAL:
            return {
                ...state,
                modal: action.modal,
            }

        default:
            return state
    }
}
