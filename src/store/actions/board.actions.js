import { utilService } from '../../services/util.service'
import { boardService } from '../../services/board.service'
import { authService } from '../../services/auth.service'
import {
    SET_BOARDS,
    SET_BOARD,
    ADD_BOARD,
    REMOVE_BOARD,
    UPDATE_BOARD,
    UPDATE_BOARDS,
    SET_FILTERED_BOARD,
} from '../reducers/board.reducer'
import { store } from '../store'
import { setCurChecklist } from './app.actions'

export {
    loadBoards,
    loadBoard,
    unloadBoard,
    applyBoardFilter,
    createBoard,
    deleteBoard,
    updateBoard,
    createGroup,
    deleteGroup,
    updateGroup,
    moveGroup,
    copyGroup,
    createTask,
    deleteTask,
    updateTask,
    moveTask,
    moveTasks,
    archiveTasks,
    copyTask,
    addTaskMember,
    removeTaskMember,
    addTaskComment,
    deleteTaskComment,
    updateTaskComment,
    addChecklist,
    deleteChecklist,
    moveChecklist,
    addChecklistItem,
    updateChecklistItem,
    deleteChecklistItem,
    convertChecklistItemToTask,
    createBoardLabel,
    updateBoardLabel,
    deleteBoardLabel,
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

function applyBoardFilter(filter) {
    const board = store.getState().boardModule.curBoard
    if (!board) {
        return null
    }

    // filter out archived groups
    // and filter out archived tasks from each group
    const unarchivedGroups = board.groups
        .filter((g) => !g.archivedAt)
        .map((g) => ({
            ...g,
            tasks: g.tasks.filter((t) => !t.archivedAt),
        }))

    // apply the filter
    const filteredGroups = unarchivedGroups.map((g) =>
        _applyBoardFilterToGroup(g, filter)
    )

    const filteredBoard = { ...board, groups: filteredGroups }
    store.dispatch({ type: SET_FILTERED_BOARD, filteredBoard })
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

async function createBoardLabel(board, label) {
    const boardToUpdate = { ...board }
    boardToUpdate.labels = [...board.labels, label]
    return _updateBoard(boardToUpdate)
}

async function updateBoardLabel(board, label, fieldsToUpdate) {
    const boardToUpdate = { ...board }
    boardToUpdate.labels = board.labels.map((l) =>
        l._id === label._id ? { ...label, ...fieldsToUpdate } : l
    )
    return _updateBoard(boardToUpdate)
}

async function deleteBoardLabel(board, label) {
    const boardToUpdate = { ...board }
    boardToUpdate.labels = board.labels.filter((l) => l._id !== label._id)

    // also delete the label from all tasks that use it
    boardToUpdate.groups = board.groups.map((group) => ({
        ...group,
        tasks: group.tasks.map((task) => ({
            ...task,
            labelIds: task.labelIds.filter((labelId) => labelId !== label._id),
        })),
    }))

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

async function moveGroup(board, group, targetBoardId, targetPositionId) {
    // remove group from source board
    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.filter((g) => g._id !== group._id)

    if (board._id === targetBoardId) {
        // move group to a new position in the same board
        boardToUpdate.groups.splice(targetPositionId, 0, group)
        return _updateBoard(boardToUpdate)
    }

    // move group to a different board
    const allBoards = store.getState().boardModule.boards
    const targetBoard = allBoards.find((b) => b._id === targetBoardId)
    const targetBoardToUpdate = { ...targetBoard }
    targetBoardToUpdate.groups.splice(targetPositionId, 0, group)
    return _updateBoards([boardToUpdate, targetBoardToUpdate])
}

async function copyGroup(board, group, title, targetPosition) {
    const groupCopy = {
        ...structuredClone(group),
        _id: utilService.makeId(),
        title,
    }

    groupCopy.tasks.forEach((task) => (task._id = utilService.makeId()))

    const boardToUpdate = { ...board }
    boardToUpdate.groups.splice(targetPosition, 0, groupCopy)
    _updateBoard(boardToUpdate)
}

// TASK

async function createTask(board, group, task, position) {
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = [...group.tasks]
    groupToUpdate.tasks.splice(position, 0, task)
    return _updateGroup(board, groupToUpdate)
}

async function deleteTask(hierarchy) {
    const { board, group, task } = hierarchy
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)
    return _updateGroup(board, groupToUpdate)
}

async function updateTask(hierarchy, fieldsToUpdate) {
    const { board, group, task } = hierarchy
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.map((t) =>
        t._id === task._id ? { ...task, ...fieldsToUpdate } : t
    )
    return _updateGroup(board, groupToUpdate)
}

async function moveTask(
    hierarchy,
    targetBoardId,
    targetGroupId,
    targetPositionId
) {
    const { board, group, task } = hierarchy

    // moving a task automatically unarchives it
    const taskToUpdate = { ...task }
    taskToUpdate.archivedAt = null

    hierarchy.task = taskToUpdate

    if (board._id === targetBoardId) {
        if (group._id === targetGroupId) {
            return _moveTaskInsideGroup(hierarchy, targetPositionId)
        } else {
            return _moveTaskInsideBoard(
                hierarchy,
                targetGroupId,
                targetPositionId
            )
        }
    } else {
        return _moveTaskToDifferentBoard(
            hierarchy,
            targetBoardId,
            targetGroupId,
            targetPositionId
        )
    }
}

// move all the tasks from the source group to the bottom of the target group
async function moveTasks(board, sourceGroup, targetGroupId) {
    const tasksToMove = sourceGroup.tasks

    // remove tasks from source group
    const sourceGroupToUpdate = { ...sourceGroup }
    sourceGroupToUpdate.tasks = []

    // insert tasks into target group
    const targetGroup = board.groups.find((g) => g._id === targetGroupId)
    const targetGroupToUpdate = { ...targetGroup }
    targetGroupToUpdate.tasks.push(...tasksToMove)

    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === targetGroupId
            ? targetGroupToUpdate
            : g._id === sourceGroup._id
            ? sourceGroupToUpdate
            : g
    )

    return _updateBoard(boardToUpdate)
}

// archive all tasks in the group
async function archiveTasks(board, group) {
    const groupToUpdate = { ...group }
    groupToUpdate.tasks = group.tasks.map((task) => ({
        ...task,
        archivedAt: Date.now(),
    }))

    _updateGroup(board, groupToUpdate)
}

async function copyTask(
    task,
    newTitle,
    targetBoardId,
    targetGroupId,
    targetPositionId
) {
    const allBoards = store.getState().boardModule.boards
    const targetBoard = allBoards.find((b) => b._id === targetBoardId)
    const targetGroup = targetBoard.groups.find((g) => g._id === targetGroupId)
    const targetGroupToUpdate = { ...targetGroup }

    // copying an archived task creates an unarchived task
    const taskCopy = {
        ...structuredClone(task),
        _id: utilService.makeId(),
        archivedAt: null,
        title: newTitle,
    }
    targetGroupToUpdate.tasks.splice(targetPositionId, 0, taskCopy)
    _updateGroup(targetBoard, targetGroupToUpdate)
}

// TASK MEMBER

async function addTaskMember(hierarchy, member) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    if (taskToUpdate.memberIds) {
        taskToUpdate.memberIds = [...task.memberIds, member._id]
    } else {
        taskToUpdate.memberIds = [member._id]
    }

    return _updateTask(board, group, taskToUpdate)
}

async function removeTaskMember(hierarchy, member) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    taskToUpdate.memberIds = task.memberIds.filter((id) => id !== member._id)
    return _updateTask(board, group, taskToUpdate)
}

// COMMENT

async function addTaskComment(hierarchy, comment) {
    comment.createdBy = authService.getLoggedinUser()._id
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    if (taskToUpdate.comments) {
        taskToUpdate.comments = [...task.comments, comment]
        taskToUpdate.comments.sort((c1, c2) =>
            c1.createdAt < c2.createdAt ? 1 : -1
        )
    } else {
        taskToUpdate.comments = [comment]
    }

    return _updateTask(board, group, taskToUpdate)
}

async function deleteTaskComment(hierarchy, comment) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    taskToUpdate.comments = taskToUpdate.comments.filter(
        (c) => c._id !== comment._id
    )
    return _updateTask(board, group, taskToUpdate)
}

async function updateTaskComment(hierarchy, comment) {
    comment.isEdited = true

    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }

    taskToUpdate.comments = task.comments.map((c) =>
        c._id === comment._id ? comment : c
    )
    return _updateTask(board, group, taskToUpdate)
}

// CHEKCLIST

async function addChecklist(hierarchy, checklist) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = [...task.checklists, checklist]
    setCurChecklist(checklist._id)
    return _updateTask(board, group, taskToUpdate)
}

async function deleteChecklist(hierarchy, checklist) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = task.checklists.filter(
        (c) => c._id !== checklist._id
    )
    return _updateTask(board, group, taskToUpdate)
}

async function moveChecklist(hierarchy, checklistId, targetPositionId) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }

    const checklistToMove = task.checklists.find((c) => c._id === checklistId)
    taskToUpdate.checklists = [...task.checklists]
    taskToUpdate.checklists = task.checklists.filter(
        (c) => c._id !== checklistId
    )

    taskToUpdate.checklists.splice(targetPositionId, 0, checklistToMove)
    return _updateTask(board, group, taskToUpdate)
}

async function addChecklistItem(hierarchy, checklist, item) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = [...checklist.items, item]
    _updateChecklist(hierarchy, checklistToUpdate)
}

async function updateChecklistItem(hierarchy, checklist, item, fieldsToUpdate) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.map((i) =>
        i._id === item._id ? { ...item, ...fieldsToUpdate } : i
    )
    _updateChecklist(hierarchy, checklistToUpdate)
}

async function deleteChecklistItem(hierarchy, checklist, item) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.filter((i) => i._id !== item._id)
    _updateChecklist(hierarchy, checklistToUpdate)
}

async function convertChecklistItemToTask(hierarchy, checklist, item) {
    const { board, group, task } = hierarchy

    const groupToUpdate = { ...group }

    // Add a new task to the group
    const newTask = boardService.getEmptyTask(item.title)
    groupToUpdate.tasks = [...group.tasks, newTask]

    // remove the checklist item from the checklist
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.filter((i) => i._id !== item._id)

    // update the checklists in the task
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = task.checklists.map((c) =>
        c._id === checklistToUpdate._id ? checklistToUpdate : c
    )

    // update the task in the updated group
    groupToUpdate.tasks = groupToUpdate.tasks.map((t) =>
        t._id === taskToUpdate._id ? taskToUpdate : t
    )

    _updateGroup(board, groupToUpdate)
}

// TASK LABEL

async function addTaskLabel(hierarchy, label) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    const taskLabelIds = [...task.labelIds, label._id]

    // keep the same order of labels as in the board labels
    taskToUpdate.labelIds = board.labels
        .filter((l) => taskLabelIds.includes(l._id))
        .map((l) => l._id)

    return _updateTask(board, group, taskToUpdate)
}

async function removeTaskLabel(hierarchy, label) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    const taskLabelIds = task.labelIds.filter((id) => id !== label._id)

    // keep the same order of labels as in the board labels
    taskToUpdate.labelIds = board.labels
        .filter((l) => taskLabelIds.includes(l._id))
        .map((l) => l._id)
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

async function _updateBoards(boards) {
    try {
        // optimistic update
        store.dispatch({ type: UPDATE_BOARDS, boards })

        for (const b of boards) {
            await boardService.save(b)
        }
    } catch (err) {
        console.error('Failed to update boards:', err)
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

async function _updateChecklist(hierarchy, checklistToUpdate) {
    const { board, group, task } = hierarchy
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = task.checklists.map((c) =>
        c._id === checklistToUpdate._id ? checklistToUpdate : c
    )
    _updateTask(board, group, taskToUpdate)
}

// move task in the same group
async function _moveTaskInsideGroup(hierarchy, targetPosition) {
    const { board, group, task } = hierarchy

    const updatedTasks = group.tasks.filter((t) => t._id != task._id)
    updatedTasks.splice(targetPosition, 0, task)

    const groupToUpdate = { ...group }
    groupToUpdate.tasks = updatedTasks

    return _updateGroup(board, groupToUpdate)
}

// move task to a different group in the same board
async function _moveTaskInsideBoard(hierarchy, targetGroupId, targetPosition) {
    const { board, group, task } = hierarchy

    // remove task from source group
    const sourceGroupToUpdate = { ...group }
    sourceGroupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)

    // insert task into target group
    const targetGroup = board.groups.find((g) => g._id === targetGroupId)
    const targetGroupToUpdate = { ...targetGroup }
    targetGroupToUpdate.tasks.splice(targetPosition, 0, task)

    const boardToUpdate = { ...board }
    boardToUpdate.groups = board.groups.map((g) =>
        g._id === targetGroupId
            ? targetGroupToUpdate
            : g._id === group._id
            ? sourceGroupToUpdate
            : g
    )

    return _updateBoard(boardToUpdate)
}

// move task to a different board
async function _moveTaskToDifferentBoard(
    hierarchy,
    targetBoardId,
    targetGroupId,
    targetPositionId
) {
    const { board, group, task } = hierarchy

    // remove task from source group
    const sourceGroupToUpdate = { ...group }
    sourceGroupToUpdate.tasks = group.tasks.filter((t) => t._id !== task._id)
    const sourceBoardToUpdate = { ...board }
    sourceBoardToUpdate.groups = board.groups.map((g) =>
        g._id === group._id ? sourceGroupToUpdate : g
    )

    // insert task into target group in target board
    const allBoards = store.getState().boardModule.boards
    const targetBoard = allBoards.find((b) => b._id === targetBoardId)
    const targetGroup = targetBoard.groups.find((g) => g._id === targetGroupId)
    const targetGroupToUpdate = { ...targetGroup }
    targetGroupToUpdate.tasks.splice(targetPositionId, 0, task)
    const targetBoardToUpdate = { ...targetBoard }
    targetBoardToUpdate.groups = targetBoard.groups.map((g) =>
        g._id === targetGroupId ? targetGroupToUpdate : g
    )

    return _updateBoards([sourceBoardToUpdate, targetBoardToUpdate])
}

function _applyBoardFilterToGroup(group, filter) {
    const filteredTasks = group.tasks.filter((t) =>
        _isTaskMatchFilter(t, filter)
    )
    return { ...group, tasks: filteredTasks }
}

function _isTaskMatchFilter(task, filter) {
    // keyword
    const pattern = new RegExp(filter.txt, 'i')
    if (!task.title.match(pattern)) {
        return false
    }

    // members
    if (!_isTaskMatchMembers(task, filter)) {
        return false
    }

    // due date
    if (!_isTaskMatchDate(task, filter)) {
        return false
    }

    return true
}

function _isTaskMatchMembers(task, filter) {
    const { members } = filter

    if (!members || !members.length) {
        // no member-related filtering
        return true
    }

    if (!task.memberIds || !task.memberIds.length) {
        return members.includes('none')
    }

    return task.memberIds.some((id) => members.includes(id))
}

function _isTaskMatchDate(task, filter) {
    const { complete, notDue, overdue, due } = filter

    if (!complete && !notDue && !overdue && !due) {
        // no date-related filtering
        return true
    }
    const dates = task.dates

    const isMatchComplete = _isDatesMatchComplete(complete, dates)
    const isMatchNotDue = _isDatesMatchNotDue(notDue, dates)
    const isMatchOverdue = _isDatesMatchOverdue(overdue, dates)
    const isMatchDue = _isDatesMatchDue(due, dates)

    return isMatchComplete || isMatchNotDue || isMatchOverdue || isMatchDue
}

function _isDatesMatchComplete(complete, dates) {
    switch (complete) {
        case null:
            // no filtering by complete
            return false
        case true:
            // return true if the dates are marked as complete
            return Boolean(dates?.isComplete)
        case false:
            // return true if there are no dates or they are not marked as complete
            return !dates || !dates.isComplete
    }

    // shouldn't reach here
    console.error('Internal error: complete is', complete)
    return false
}

function _isDatesMatchNotDue(notDue, dates) {
    if (!notDue) {
        // no filtering by not due
        return false
    }
    // return true if there are no dates or if there is no due date
    return !dates || !dates.dueDate
}

function _isDatesMatchOverdue(overdue, dates) {
    if (!overdue || !dates || !dates.dueDate) {
        // no filtering by overdue, or no due date
        return false
    }
    // return true if the due date is overdue
    const delta = dates.dueDate - Math.floor(Date.now() / 1000)

    return delta < 0
}

function _isDatesMatchDue(due, dates) {
    if (!due || !dates || !dates.dueDate) {
        // no filtering by due, or no due date
        return false
    }
    // return true if the due date is overdue
    const delta = dates.dueDate - Math.floor(Date.now() / 1000)

    // number of seconds per hour
    const SECONDS_PER_HOUR = 3600

    const maxDeltaDays = {
        day: 1,
        week: 7,
        month: 30,
    }
    return delta > 0 && delta < maxDeltaDays[due] * 24 * SECONDS_PER_HOUR
}
