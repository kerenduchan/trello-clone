import { storageService } from './async-storage.service'
import { utilService } from './util.service'
import { authService } from './auth.service'
import {
    moveTask,
    moveGroup,
    moveChecklist,
} from '../store/actions/board.actions'

export const boardService = {
    getDefaultFilter,
    isFilterEmpty,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    getEmptyChecklist,
    getEmptyChecklistItem,
    getEmptyComment,
    getEmptyLabel,
    query,
    getById,
    save,
    remove,
    create,
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
    getLabelColorById,
    getLabelColors,
    getNoLabelColor,
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

const STORAGE_KEY = 'boards'

_createBoards()

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
        labels: _getDefaultLabels(),
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
        color: getLabelColorById(colorId),
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

async function query() {
    // return only the boards that this user is authorized to view
    const allboards = await storageService.query(STORAGE_KEY)
    const loggedinUser = authService.getLoggedinUser()
    return allboards.filter((b) =>
        b.members.find((member) => member._id === loggedinUser._id)
    )
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(boardToSave) {
    if (boardToSave._id) {
        return storageService.put(STORAGE_KEY, boardToSave)
    } else {
        return storageService.post(STORAGE_KEY, boardToSave)
    }
}

async function create(board) {
    return await storageService.post(STORAGE_KEY, board)
}

function parseSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    return utilService.parseSearchParams(searchParams, defaultFilter)
}

function buildSearchParams(filter) {
    return utilService.buildSearchParams(filter, getDefaultFilter())
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = [
            {
                _id: '1234',
                title: 'Greengrocer Shop Web Dev',
                isStarred: false,
                archivedAt: null,
                createdBy: {
                    _id: 'u101',
                    fullname: 'Keren Duchan',
                    imgUrl: 'images/keren-avatar.jpg',
                },
                style: {
                    backgroundImage:
                        'https://images.unsplash.com/photo-1699393393028-d44da72dba1d',
                },
                labels: _getDefaultLabels(),
                members: [
                    {
                        _id: 'u102',
                        fullname: 'Yigal Shalom',
                        username: 'yigal',
                        imgUrl: 'images/yigal-avatar.jpg',
                    },
                    {
                        _id: 'u101',
                        fullname: 'Keren Duchan',
                        username: 'keren',
                        imgUrl: 'images/keren-avatar.jpg',
                    },
                ],
                groups: [
                    {
                        _id: 'g101',
                        title: 'Backlog: Server',
                        archivedAt: null,
                        tasks: [
                            {
                                _id: 'c101',
                                title: 'Design Web API',
                                archivedAt: null,
                                cover: {
                                    bgColor: '#98b5a0',
                                },
                                checklists: [
                                    {
                                        _id: 'YEhmF',
                                        title: 'High Priority',
                                        items: [
                                            {
                                                _id: '212jX',
                                                title: 'REST or GraphQL?',
                                                isDone: true,
                                            },
                                            {
                                                _id: '212jZ',
                                                title: 'Write design doc',
                                                isDone: false,
                                            },
                                            {
                                                _id: '212jF',
                                                title: 'Design review meeting',
                                                isDone: false,
                                            },
                                        ],
                                    },
                                    {
                                        _id: 'YEhmg',
                                        title: 'Maybe if we have time',
                                        items: [
                                            {
                                                _id: '212ja',
                                                title: 'have coffee',
                                                isDone: false,
                                            },
                                            {
                                                _id: '212jb',
                                                title: 'eat lunch',
                                                isDone: false,
                                            },
                                        ],
                                    },
                                ],
                                labelIds: ['l101', 'l102'],
                                memberIds: ['u102'],
                            },
                            {
                                _id: 'c102',
                                title: 'Install nodeJS',
                                archivedAt: null,
                                labelIds: [],
                                checklists: [],
                            },
                        ],
                    },
                    {
                        _id: 'g102',
                        title: 'Backlog: Client',
                        archivedAt: null,
                        labelIds: [],
                        tasks: [
                            {
                                _id: 'c103',
                                title: 'Log out functionality',
                                archivedAt: null,
                                labelIds: [],
                                checklists: [],
                                description:
                                    'Allow a logged-in user to log out',
                                comments: [
                                    {
                                        _id: 'ZdPnm',
                                        text: 'please CR this',
                                        createdAt: 1590999817436,
                                        createdBy: 'u101',
                                    },
                                ],
                                attachments: [
                                    {
                                        _id: 'a101',
                                        title: 'cute cats',
                                        createdAt: 1590999817436,
                                        createdBy: 'u101',
                                        fileUrl:
                                            'https://res.cloudinary.com/ddp0wyac3/raw/upload/v1704969821/teu5zl8dwhc90iwzul6p.jpg',
                                    },
                                ],
                            },
                            {
                                _id: 'c104',
                                title: 'Filter products',
                                archivedAt: null,
                                labelIds: [],
                                checklists: [],
                                cover: {
                                    bgColor: '#e774bb',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                _id: '1235',
                title: 'Personal Board',
                isStarred: false,
                archivedAt: null,
                labels: _getDefaultLabels(),
                groups: [],
                members: [
                    {
                        _id: 'u101',
                        fullname: 'Keren Duchan',
                        imgUrl: 'images/keren-avatar.jpg',
                    },
                ],
                createdBy: {
                    _id: 'u102',
                    fullname: 'Yigal Shalom',
                    imgUrl: 'http://some-img',
                },
                style: {
                    backgroundImage:
                        'https://images.unsplash.com/photo-1699116548123-73affe0987b7',
                },
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
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

function _getDefaultLabels() {
    const defaultColorIds = [
        'lc106',
        'lc107',
        'lc108',
        'lc109',
        'lc110',
        'lc121',
    ]

    return defaultColorIds.map((colorId, idx) => ({
        _id: `l10${idx + 1}`,
        title: '',
        colorId,
        color: getLabelColorById(colorId),
    }))
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

function getLabelColorById(id) {
    const noLabelColor = getNoLabelColor()
    if (id === noLabelColor._id) {
        return noLabelColor
    }

    return getLabelColors().find((lc) => lc._id === id)
}

function _getDefaultLabelColorId() {
    return getLabelColors().find((lc) => lc.name === 'sky')._id
}

function _getLabelColor(_id, name, bgColor, textColor) {
    return { _id, name, bgColor, textColor }
}

function getLabelColors() {
    return [
        _getLabelColor('lc101', 'subtle green', '#baf3db', '#164b35'),
        _getLabelColor('lc102', 'subtle yellow', '#f8e6a0', '#533f04'),
        _getLabelColor('lc103', 'subtle orange', '#fedec8', '#702e00'),
        _getLabelColor('lc104', 'subtle red', '#ffd5d2', '#5d1f1a'),
        _getLabelColor('lc105', 'subtle purple', '#dfd8fd', '#352c63'),

        _getLabelColor('lc106', 'green', '#4bce97', '#164b35'),
        _getLabelColor('lc107', 'yellow', '#f5cd47', '#533f04'),
        _getLabelColor('lc108', 'orange', '#fea362', '#702e00'),
        _getLabelColor('lc109', 'red', '#f87168', '#5d1f1a'),
        _getLabelColor('lc110', 'purple', '#9f8fef', '#352c63'),

        _getLabelColor('lc111', 'bold green', '#1f845a', '#ffffff'),
        _getLabelColor('lc112', 'bold yellow', '#946f00', '#ffffff'),
        _getLabelColor('lc113', 'bold orange', '#c25100', '#ffffff'),
        _getLabelColor('lc114', 'bold red', '#c9372c', '#ffffff'),
        _getLabelColor('lc115', 'bold purple', '#6e5dc6', '#ffffff'),

        _getLabelColor('lc116', 'subtle blue', '#cce0ff', '#09326c'),
        _getLabelColor('lc117', 'subtle sky', '#c6edfb', '#164555'),
        _getLabelColor('lc118', 'subtle lime', '#d3f1a7', '#37471f'),
        _getLabelColor('lc119', 'subtle pink', '#fdd0ec', '#50253f'),
        _getLabelColor('lc120', 'subtle black', '#dcdfe4', '#091e42'),

        _getLabelColor('lc121', 'blue', '#579dff', '#09326c'),
        _getLabelColor('lc122', 'sky', '#6cc3e0', '#164555'),
        _getLabelColor('lc123', 'lime', '#94c748', '#37471f'),
        _getLabelColor('lc124', 'pink', '#e774bb', '#50253f'),
        _getLabelColor('lc125', 'black', '#8590a2', '#091e42'),

        _getLabelColor('lc126', 'bold blue', '#0c66e4', '#ffffff'),
        _getLabelColor('lc127', 'bold sky', '#227d9b', '#ffffff'),
        _getLabelColor('lc128', 'bold lime', '#5b7f24', '#ffffff'),
        _getLabelColor('lc129', 'bold pink', '#ae4787', '#ffffff'),
        _getLabelColor('lc130', 'bold black', '#626f86', '#ffffff'),
    ]
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

function getNoLabelColor() {
    return _getLabelColor('lc000', 'none', '#091e420f', '#172b4d')
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
