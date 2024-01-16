import { utilService } from '../../../services/util.service'
import { boardService } from '../../../services/board/board.service'

import {
    boardsChanged,
    boardChanged,
    boardAdded,
    boardRemoved,
    boardUpdated,
    boardsUpdated,
} from '../../reducers/board.reducer'
import { store } from '../../store'

export {
    loadBoards,
    loadBoard,
    unloadBoard,
    createBoard,
    deleteBoard,
    updateBoard,
    moveGroup,
    copyGroup,
    moveTask,
    moveTasks,
    archiveTasks,
    copyTask,
    deleteBoardLabel,
}

async function loadBoards() {
    try {
        const { data } = await boardService.query()
        store.dispatch(boardsChanged(data))
    } catch (err) {
        console.error('Failed to load boards:', err)
        throw err
    }
}

async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch(boardChanged(board))
    } catch (err) {
        console.error('Failed to load board:', err)
        throw err
    }
}

function unloadBoard() {
    if (store.getState().board.curBoard !== null) {
        store.dispatch(boardChanged(null))
    }
}

// BOARD

async function createBoard(board) {
    try {
        // Can't optimistically add a board
        // because the ID comes from the backend
        const boardWithId = await boardService.create(board)
        store.dispatch(boardAdded(boardWithId))
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
        store.dispatch(boardRemoved(boardId))
    } catch (err) {
        console.error('Failed to delete board:', err)
        throw err
    }
}

// BOARD LABEL

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
    const allBoards = store.getState().board.boards
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
    const allBoards = store.getState().board.boards
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

// PRIVATE HELPER FUNCTIONS

async function _updateBoard(board) {
    try {
        // optimistic update
        store.dispatch(boardUpdated(board))
        return boardService.update(board)
    } catch (err) {
        console.error('Failed to update board:', err)
        // TODO: undo the store change
        throw err
    }
}

async function _updateBoards(boards) {
    try {
        // optimistic update
        store.dispatch(boardsUpdated(boards))

        for (const b of boards) {
            await boardService.update(b)
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
    targetGroupToUpdate.tasks = [...targetGroupToUpdate.tasks]
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
    const allBoards = store.getState().board.boards
    const targetBoard = allBoards.find((b) => b._id === targetBoardId)
    const targetGroup = targetBoard.groups.find((g) => g._id === targetGroupId)
    const targetGroupToUpdate = { ...targetGroup }
    targetGroupToUpdate.tasks = [...targetGroupToUpdate.tasks]
    targetGroupToUpdate.tasks.splice(targetPositionId, 0, task)
    const targetBoardToUpdate = { ...targetBoard }
    targetBoardToUpdate.groups = targetBoard.groups.map((g) =>
        g._id === targetGroupId ? targetGroupToUpdate : g
    )

    return _updateBoards([sourceBoardToUpdate, targetBoardToUpdate])
}
