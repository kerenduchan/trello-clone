export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'

const initialState = {
    boards: [],
    curBoard: null,
}

export function boardReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_BOARDS:
            return {
                ...state,
                boards: action.boards,
            }
        case SET_BOARD:
            return {
                ...state,
                curBoard: action.board,
            }
        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.board],
            }

        case REMOVE_BOARD:
            return {
                ...state,
                boards: state.boards.filter(
                    (board) => board._id !== action.boardId
                ),
            }
        case UPDATE_BOARD:
            return {
                ...state,
                boards: state.boards.map((board) =>
                    board._id === action.board._id ? action.board : board
                ),
                curBoard:
                    state.curBoard?._id === action.board._id
                        ? action.board
                        : state.curBoard,
            }
        default:
            return state
    }
}
