export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

const initialState = {
    boards: [],
    curBoard: null,
    prevState: null,
}

// Objects in action MUST NOT contain pointers to the current state.
// New state can contain pointers to prev state's objects as long as they
// are not mutated at any point.
export function boardReducer(state = initialState, action = {}) {
    const newState = {
        ...state,
        prevState: state,
    }

    switch (action.type) {
        case SET_BOARDS:
            newState.boards = action.boards
            break

        case SET_BOARD:
            newState.curBoard = action.board
            break

        case ADD_BOARD:
            // new array containing pointers to old unmutated boards
            // and a new board
            newState.boards = [...newState.boards, action.board]
            break

        case REMOVE_BOARD:
            // new array containing pointers to old unmutated boards
            // minus the removed board
            newState.boards = newState.boards.filter(
                (b) => b._id !== action.boardId
            )
            break

        case UPDATE_BOARD:
            // new array containing pointers to old unmutated boards
            // except for the updated board which is new
            newState.boards = newState.boards.map((b) =>
                b._id === action.board._id ? action.board : b
            )

            if (newState.curBoard._id === action.board._id) {
                newState.curBoard = action.board
            }
            break

        default:
            return state
    }
    console.log('REDUCER after', action, newState)
    return newState
}
