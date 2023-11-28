import { boardService } from '../../services/board.service'
import {
    SET_BOARDS,
    SET_BOARD,
    ADD_BOARD,
    REMOVE_BOARD,
    UPDATE_BOARD,
} from '../reducers/board.reducer'
import { store } from '../store'

export {
    loadBoards,
    loadBoard,
    unloadBoard,
    createBoard,
    deleteBoard,
    updateBoard,
    createGroup,
    deleteGroup,
    updateGroup,
    createTask,
    deleteTask,
    updateTask,
    deleteChecklist,
    updateChecklistItem,
    updateBoardLabel,
    removeTaskLabel,
    addTaskLabel,
}

async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.error('Failed to load boards:', err)
        throw err
    }
}

async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error('Failed to load board:', err)
        throw err
    }
}

function unloadBoard() {
    store.dispatch({ type: SET_BOARD, board: null })
}

// BOARD

async function createBoard(board) {
    try {
        // Can't optimistically add a board
        // because the ID comes from the backend
        const boardWithId = await boardService.save(board)
        store.dispatch({ type: ADD_BOARD, board: boardWithId })
        return boardWithId
    } catch (err) {
        console.error('Failed to create board:', err)
        throw err
    }
}

async function deleteBoard(board) {
    const boardId = board._id
    try {
        // Not implementing optimistic removal here - deleting a board
        // should wait for deletion in the backend. This is because the
        // BoardIndex reloads the boards from the backend. For optimistic
        // removal, boards should be reloaded from the backend at a component
        // above the BoardIndex.
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        console.error('Failed to delete board:', err)
        throw err
    }
}

async function updateBoard(board, fieldsToUpdate) {
    return _updateBoard({ ...structuredClone(board), ...fieldsToUpdate })
}

// GROUP

async function createGroup(board, group) {
    const boardClone = structuredClone(board)
    boardClone.groups.push(group)
    return _updateBoard(boardClone)
}

async function deleteGroup(board, group) {
    const boardClone = structuredClone(board)
    boardClone.groups = boardClone.groups.filter((g) => g._id !== group._id)
    return _updateBoard(boardClone)
}

async function updateGroup(board, group, fieldsToUpdate) {
    const boardClone = structuredClone(board)
    boardClone.groups = boardClone.groups.map((g) =>
        g._id === group._id
            ? { ...structuredClone(group), ...fieldsToUpdate }
            : g
    )
    return _updateBoard(boardClone)
}

// TASK

async function createTask(board, group, task) {
    const boardClone = structuredClone(board)
    const groupClone = boardService.getGroupById(boardClone, group._id)
    groupClone.tasks.push(task)
    return _updateBoard(boardClone)
}

async function deleteTask(board, group, task) {
    const boardClone = structuredClone(board)
    const groupClone = boardService.getGroupById(boardClone, group._id)
    groupClone.tasks = groupClone.tasks.filter((t) => t._id !== task._id)
    return _updateBoard(boardClone)
}

async function updateTask(board, group, task, fieldsToUpdate) {
    const boardClone = structuredClone(board)
    const groupClone = boardService.getGroupById(boardClone, group._id)
    groupClone.tasks = groupClone.tasks.map((t) =>
        t._id === task._id ? { ...structuredClone(task), ...fieldsToUpdate } : t
    )
    return _updateBoard(boardClone)
}

// CHEKCLIST

async function deleteChecklist(board, group, task, checklist) {
    const boardClone = structuredClone(board)
    const taskClone = boardService.getTaskById(boardClone, group._id, task._id)
    taskClone.checklists = taskClone.checklists.filter(
        (c) => c._id !== checklist._id
    )
    return _updateBoard(boardClone)
}

async function updateChecklistItem(
    board,
    group,
    task,
    checklist,
    item,
    fieldsToUpdate
) {
    const boardClone = structuredClone(board)
    const checklistClone = boardService.getChecklistById(
        boardClone,
        group._id,
        task._id,
        checklist._id
    )
    checklistClone.items = checklistClone.items.map((i) =>
        i._id === item._id ? { ...structuredClone(item), ...fieldsToUpdate } : i
    )
    return _updateBoard(boardClone)
}

// LABEL

async function updateBoardLabel(board, label, fieldsToUpdate) {
    const boardClone = structuredClone(board)
    boardClone.labels = boardClone.labels.map((l) =>
        l._id === label._id
            ? { ...structuredClone(label), ...fieldsToUpdate }
            : l
    )
    return _updateBoard(boardClone)
}

async function addTaskLabel(board, group, task, label) {
    const boardClone = structuredClone(board)
    const taskClone = boardService.getTaskById(boardClone, group._id, task._id)
    taskClone.labelIds.push(label._id)
    return _updateBoard(boardClone)
}

async function removeTaskLabel(board, group, task, label) {
    const boardClone = structuredClone(board)
    const taskClone = boardService.getTaskById(boardClone, group._id, task._id)
    taskClone.labelIds = taskClone.labelIds.filter((lId) => lId !== label._id)
    return _updateBoard(boardClone)
}

// PRIVATE HELPER FUNCTIONS

// the given board MUST have no shared pointers with the store's board!
async function _updateBoard(board) {
    try {
        // optimistic update
        store.dispatch({ type: UPDATE_BOARD, board })
        return boardService.save(board)
    } catch (err) {
        console.error('Failed to update board:', err)
        // TODO: undo the store change
        throw err
    }
}
