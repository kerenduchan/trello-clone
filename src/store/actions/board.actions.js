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
    if (store.getState().boardModule.curBoard !== null) {
        store.dispatch({ type: SET_BOARD, board: null })
    }
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

async function updateBoard(board, fieldsToUpdate) {
    return _updateBoard({ ...board, ...fieldsToUpdate })
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

// BOARD LABEL

async function updateBoardLabel(board, label, fieldsToUpdate) {
    const boardToUpdate = { ...board }
    boardToUpdate.labels = board.labels.map((l) =>
        l._id === label._id ? { ...label, ...fieldsToUpdate } : l
    )
    console.log('board to update', boardToUpdate)
    return _updateBoard(boardToUpdate)
}

// GROUP

async function createGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = [...board.groups, group]
    return _updateBoard(boardToUpdate)
}

async function deleteGroup(board, group) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.filter((g) => g._id !== group._id)
    return _updateBoard(boardToUpdate)
}

async function updateGroup(board, group, fieldsToUpdate) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? { ...group, ...fieldsToUpdate } : g
    )
    return _updateBoard(boardToUpdate)
}

// TASK

async function createTask(board, group, task) {
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = [...group.tasks, task]
    return _updateGroup(board, groupToUpdate)
}

async function deleteTask(board, group, task) {
    const groupToUpdate = { ...g }
    groupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)
    return _updateGroup(board, groupToUpdate)
}

async function updateTask(board, group, task, fieldsToUpdate) {
    const groupToUpdate = { ...g }
    groupToUpdate.tasks = group.tasks.map((t) =>
        t._id === task._id ? { ...task, ...fieldsToUpdate } : t
    )
    return _updateGroup(board, groupToUpdate)
}

// CHEKCLIST

async function deleteChecklist(board, group, task, checklist) {
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = task.checklists.filter(
        (c) => c._id !== checklist._id
    )
    return _updateTask(board, group, taskToUpdate)
}

async function updateChecklistItem(
    board,
    group,
    task,
    checklist,
    item,
    fieldsToUpdate
) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.map((i) =>
        i._id === item._id ? { ...item, ...fieldsToUpdate } : i
    )
    _updateChecklist(board, group, task, checklistToUpdate)
}

// TASK LABEL
async function addTaskLabel(board, group, task, label) {
    const taskToUpdate = { ...task }
    taskToUpdate.labelIds = [...task.labelIds, label._id]
    return _updateTask(board, group, taskToUpdate)
}

async function removeTaskLabel(board, group, task, label) {
    const taskToUpdate = { ...task }
    taskToUpdate.labelIds = task.labelIds.filter((lId) => lId !== label._id)
    return _updateTask(board, group, taskToUpdate)
}

// PRIVATE HELPER FUNCTIONS

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

async function _updateGroup(board, groupToUpdate) {
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === groupToUpdate._id ? groupToUpdate : g
    )
    return _updateBoard(boardToUpdate)
}

async function _updateTask(board, group, taskToUpdate) {
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.map((t) =>
        t._id === taskToUpdate._id ? taskToUpdate : t
    )
    _updateGroup(board, groupToUpdate)
}

async function _updateChecklist(board, group, task, checklistToUpdate) {
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = task.checklists.map((c) =>
        c._id === checklistToUpdate._id ? checklistToUpdate : c
    )
    _updateTask(board, group, taskToUpdate)
}
