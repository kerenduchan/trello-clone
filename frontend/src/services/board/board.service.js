import { utilService } from '../util.service'
import { boardLocalService } from './board.local.service'
import { moveTask, moveGroup } from '../../store/actions/board/board.actions'
import { moveChecklist } from '../../store/actions/task/task.checklist.actions'

const service = boardLocalService

export const boardService = {
    ...service,
    getDefaultFilter,
    isFilterEmpty,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getEmptyChecklist,
    getEmptyChecklistItem,
    getEmptyComment,
    getEmptyLabel,
    getBackgroundImages,
    getTaskMembers,
    getTaskLabels,
    getTaskById,
    getItemById,
    getGroupAndTaskByTaskId,
    getChecklistById,
    getChecklistItemById,
    countDoneItemsInChecklist,
    countDoneItemsInAllChecklists,
    countItemsInAllChecklists,
    getChecklistPercent,
    getCoverColors,
    getTaskDateStatus,
    getArchivedTasks,
    getArchivedGroups,
    handleDragEnd,
    getTasksCount,
    parseSearchParams,
    buildSearchParams,
    getBackgroundColors,
    getBoardStyle,
    getBoardTheme,
}

function getDefaultFilter() {
    // careful with the 'complete' field - it can be true, false, or null
    return {
        txt: '',
        notDue: false,
        overdue: false,
        due: null,
        complete: null,
        members: [],
    }
}

function isFilterEmpty(filter) {
    const defaultFilter = getDefaultFilter()
    return utilService.simpleIsEqual(filter, defaultFilter)
}

function getEmptyBoard() {
    return {
        title: '',
        style: {
            backgroundImage: '',
        },
        groups: [],
        members: [],
    }
}

function getEmptyGroup() {
    return {
        _id: utilService.makeId(),
        title: '',
        archivedAt: null,
        tasks: [],
    }
}

function getEmptyTask(title = '') {
    return {
        _id: utilService.makeId(),
        title,
        archivedAt: null,
        labelIds: [],
        checklists: [],
    }
}

function getEmptyLabel() {
    const colorId = _getDefaultLabelColorId()
    return {
        _id: utilService.makeId(),
        title: '',
        colorId,
        color: service.getLabelColorById(colorId),
    }
}

function getEmptyChecklist() {
    return {
        _id: utilService.makeId(),
        title: 'Checklist',
        items: [],
    }
}

function getEmptyChecklistItem() {
    return {
        _id: utilService.makeId(),
        title: '',
        isDone: false,
    }
}

function getEmptyComment() {
    return {
        _id: utilService.makeId(),
        text: '',
        createdBy: 'u101',
        createdAt: null,
    }
}

function parseSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    return utilService.parseSearchParams(searchParams, defaultFilter)
}

function buildSearchParams(filter) {
    return utilService.buildSearchParams(filter, getDefaultFilter())
}

function getBackgroundImages() {
    return [
        'https://images.unsplash.com/photo-1699393393028-d44da72dba1d',
        'https://images.unsplash.com/photo-1699116548123-73affe0987b7',
        'https://images.unsplash.com/photo-1694111356884-45781a164220',
        'https://images.unsplash.com/photo-1695667937079-b59c63660cfc',
    ]
}

function getTaskMembers(hierarchy) {
    const { board, task } = hierarchy
    if (!task.memberIds) {
        return []
    }
    return task.memberIds
        .map((memberId) => getItemById(board, 'members', memberId))
        .filter((m) => m !== undefined)
}

function getTaskLabels(hierarchy) {
    const { board, task } = hierarchy
    if (!task.labelIds) {
        return []
    }
    return task.labelIds.map((labelId) => getItemById(board, 'labels', labelId))
}

function getItemById(board, field, itemId) {
    return board[field].find((item) => item._id === itemId)
}

function getCoverColors() {
    return [
        { _id: 'green', color: '#4bce97', textColor: '#164B35' },
        { _id: 'yellow', color: '#f5cd47', textColor: '#533F04' },
        { _id: 'orange', color: '#fea362', textColor: '#702E00' },
        { _id: 'red', color: '#f97168', textColor: '#5D1F1A' },
        { _id: 'purple', color: '#9f8fef', textColor: '#352C63' },
        { _id: 'blue', color: '#579dff', textColor: '#09326C' },
        { _id: 'teal', color: '#6cc3e0', textColor: '#164555' },
        { _id: 'lime', color: '#95c748', textColor: '#37471F' },
        { _id: 'magenta', color: '#e774bb', textColor: '#50253F' },
        { _id: 'gray', color: '#8490a2', textColor: '#091E42' },
    ]
}

function _getDefaultLabelColorId() {
    return service.getLabelColors().find((lc) => lc.name === 'sky')._id
}

function getBackgroundColors() {
    return [
        { _id: 'bgc101', color: '#0079bf' },
        { _id: 'bgc102', color: '#d29034' },
        { _id: 'bgc103', color: '#519839' },
        { _id: 'bgc104', color: '#b04632' },
        { _id: 'bgc105', color: '#89609e' },
        { _id: 'bgc106', color: '#cd5a91' },
        { _id: 'bgc107', color: '#4bbf6b' },
        { _id: 'bgc108', color: '#00aecc' },
        { _id: 'bgc109', color: '#838c91' },
    ]
}

function getTaskById(board, groupId, taskId) {
    return getItemById(board, 'groups', groupId)?.tasks.find(
        (t) => t._id === taskId
    )
}

function getGroupAndTaskByTaskId(board, taskId) {
    if (!board) {
        return
    }
    for (let i = 0; i < board.groups.length; i++) {
        const group = board.groups[i]
        for (let j = 0; j < group.tasks.length; ++j) {
            const task = group.tasks[j]
            if (task._id === taskId) {
                return { group, task }
            }
        }
    }
    return null
}

function getChecklistById(board, groupId, taskId, checklistId) {
    return getTaskById(board, groupId, taskId)?.checklists.find(
        (c) => c._id === checklistId
    )
}

function getChecklistItemById(board, groupId, taskId, checklistId, itemId) {
    return getChecklistById(board, groupId, taskId, checklistId)?.items.find(
        (i) => i._id === itemId
    )
}

function countDoneItemsInChecklist(checklist) {
    return checklist.items.reduce((acc, item) => {
        return acc + (item.isDone ? 1 : 0)
    }, 0)
}

function countItemsInAllChecklists(task) {
    return task.checklists.reduce((acc, c) => {
        return acc + c.items.length
    }, 0)
}

function countDoneItemsInAllChecklists(task) {
    return task.checklists.reduce((acc, c) => {
        return acc + countDoneItemsInChecklist(c)
    }, 0)
}

function getChecklistPercent(checklist) {
    if (checklist.items.length === 0) {
        return 0
    }
    return Math.round(
        (100 * countDoneItemsInChecklist(checklist)) / checklist.items.length
    )
}

function getTaskDateStatus(task) {
    if (!task.dates || !task.dates.dueDate) {
        return null
    }

    const statuses = {
        complete: {
            className: 'task-dates-status-complete',
            text: 'Complete',
        },
        dueSoon: {
            className: 'task-dates-status-due-soon',
            text: 'Due soon',
        },
        recentlyOverdue: {
            className: 'task-dates-status-recently-overdue',
            text: 'Overdue',
        },
        pastDue: {
            className: 'task-dates-status-past-due',
            text: 'Overdue',
        },
    }

    // number of seconds per hour
    const SECONDS_PER_HOUR = 3600

    if (task.dates.isComplete) {
        return statuses.complete
    }
    const delta = task.dates.dueDate - Math.floor(Date.now() / 1000)
    if (delta > 0 && delta < 24 * SECONDS_PER_HOUR) {
        return statuses.dueSoon
    }
    if (delta < 0) {
        if (Math.abs(delta) < 36 * SECONDS_PER_HOUR) {
            return statuses.recentlyOverdue
        }
        return statuses.pastDue
    }
    return null
}

function getArchivedTasks(board) {
    const res = board.groups.reduce((acc, group) => {
        const archivedTasksInfo = group.tasks
            .filter((task) => task.archivedAt)
            .map((task) => ({ group, task }))
        acc.push(...archivedTasksInfo)
        return acc
    }, [])
    return res
}

function getArchivedGroups(board) {
    return board.groups.filter((group) => group.archivedAt)
}

function handleDragEnd(result, board, filteredBoard) {
    const { destination, source, type } = result

    if (
        !destination ||
        (destination.droppableId === source.droppableId &&
            destination.index === source.index)
    ) {
        return
    }

    switch (type) {
        case 'task':
            _dragDropTask(result, board, filteredBoard)
            break
        case 'group':
            _dragDropGroup(result, board, filteredBoard)
            break
        case 'checklist':
            _dragDropChecklist(result, board)
            break
    }
}

function getTasksCount(board) {
    return board.groups.reduce((acc, group) => acc + group.tasks.length, 0)
}

function getBoardStyle(board) {
    if (!board) return

    const { backgroundImage, backgroundColor } = board.style

    if (backgroundImage) {
        return { backgroundImage: `url(${backgroundImage})` }
    } else if (backgroundColor) {
        return { backgroundColor }
    }
    return {}
}

function getBoardTheme(board) {
    if (board && board.style) {
        if (board.style.theme) {
            return board.style.theme
        }
        if (board.style.backgroundColor) {
            return 'dark'
        }
    }
    return 'light'
}

function _dragDropTask(result, board, filteredBoard) {
    const { destination, source, draggableId } = result

    // the source.index and destination.index are indices in filteredBoard.
    // need to convert them to indices in board, which may contain archived
    // tasks and/or tasks that are filtered out.
    const destinationIndex = _fixTaskIndex(
        board,
        filteredBoard,
        destination.droppableId,
        destination.index
    )

    const sourceGroup = board.groups.find((g) => g._id === source.droppableId)
    const targetGroupId = destination.droppableId
    const task = sourceGroup.tasks.find((t) => t._id === draggableId)
    const hierarchy = { board, group: sourceGroup, task }

    moveTask(hierarchy, board._id, targetGroupId, destinationIndex)
}

function _dragDropGroup(result, board, filteredBoard) {
    const { destination, draggableId } = result

    // the source.index and destination.index are indices in filteredBoard.
    // need to convert them to indices in board, which may contain archived
    // groups
    const destinationIndex = _fixGroupIndex(
        board,
        filteredBoard,
        destination.index
    )

    const group = board.groups.find((g) => g._id === draggableId)

    moveGroup(board, group, board._id, destinationIndex)
}

function _dragDropChecklist(result, board) {
    const { destination, draggableId } = result
    // drag-drop checklist
    const { group, task } = boardService.getGroupAndTaskByTaskId(
        board,
        source.droppableId
    )

    const hierarchy = { board, group, task }
    moveChecklist(hierarchy, draggableId, destination.index)
}

// convert index of task in group with ID=groupId in the filteredBoard to
// index in the same group in board
function _fixTaskIndex(board, filteredBoard, groupId, index) {
    // find the ID of the task before which to drop in the filtered board
    const filteredGroup = filteredBoard.groups.find((g) => g._id === groupId)
    const taskId = filteredGroup.tasks[index]._id

    // find the index of this task in board
    const group = board.groups.find((g) => g._id === groupId)
    const fixedIndex = group.tasks.findIndex((t) => t._id === taskId)
    return fixedIndex
}

// convert index of group in the filteredBoard to index in board
function _fixGroupIndex(board, filteredBoard, index) {
    // ID of the group before which to drop in the filtered board
    const groupId = filteredBoard.groups[index]._id

    // find the index of this group in board
    const fixedIndex = board.groups.findIndex((g) => g._id === groupId)
    return fixedIndex
}
