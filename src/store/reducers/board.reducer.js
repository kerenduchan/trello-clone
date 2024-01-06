export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_BOARDS = 'UPDATE_BOARDS'
export const SET_FILTERED_BOARD = 'SET_FILTERED_BOARD'

const initialState = {
    boards: [],

    // the full board, including filtered-out items and archived items
    curBoard: null,

    // the filtered board
    filteredBoard: null,

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

        case SET_FILTERED_BOARD:
            newState.filteredBoard = action.filteredBoard
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

            if (newState.curBoard?._id === action.board._id) {
                newState.curBoard = action.board
            }
            break

        case UPDATE_BOARDS:
            const boardIdToBoardMap = {}
            for (const b of action.boards) {
                boardIdToBoardMap[b._id] = b
            }

            // new array containing pointers to old unmutated boards
            // except for the updated boards which are new

            newState.boards = newState.boards.map((b) =>
                boardIdToBoardMap[b._id] ? boardIdToBoardMap[b._id] : b
            )

            const curBoardId = newState.curBoard?._id
            if (boardIdToBoardMap[curBoardId]) {
                newState.curBoard = boardIdToBoardMap[curBoardId]
            }
            break

        default:
            return state
    }
    return newState
}
