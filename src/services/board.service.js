import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const boardService = {
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    query,
    getById,
    save,
    remove,
    create,
    getBackgroundImages,
    getTaskLabels,
    getLabelById,
    getGroupById,
    getTaskById,
    getChecklistById,
    getChecklistItemById,
}

const STORAGE_KEY = 'boards'

_createBoards()

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
        tasks: [],
    }
}

function getEmptyTask() {
    return {
        _id: utilService.makeId(),
        title: '',
        archivedAt: null,
        labelIds: [],
    }
}

async function query() {
    return await storageService.query(STORAGE_KEY)
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
                    imgUrl: 'http://some-img',
                },
                style: {
                    backgroundImage:
                        'https://images.unsplash.com/photo-1699393393028-d44da72dba1d',
                },
                labels: [
                    {
                        _id: 'l101',
                        title: 'Done',
                        color: '#61bd4f',
                        colorName: 'Green',
                    },
                    {
                        _id: 'l102',
                        title: 'Progress',
                        color: '#db60a2',
                        colorName: 'Pink',
                    },
                    {
                        _id: 'l103',
                        title: '',
                        color: '#f2ea74',
                        colorName: 'Yellow',
                    },
                ],
                members: [
                    {
                        _id: 'u101',
                        fullname: 'Tal Tarablus',
                        imgUrl: 'https://www.google.com',
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
                            },
                            {
                                _id: 'c102',
                                title: 'Install nodeJS',
                                archivedAt: null,
                                labelIds: [],
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
                                description:
                                    'Allow a logged-in user to log out',
                                comments: [
                                    {
                                        id: 'ZdPnm',
                                        txt: 'also @yaronb please CR this',
                                        createdAt: 1590999817436,
                                        byMember: {
                                            _id: 'u101',
                                            fullname: 'Tal Tarablus',
                                            imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                        },
                                    },
                                ],
                            },
                            {
                                _id: 'c104',
                                title: 'Filter products',
                                archivedAt: null,
                                labelIds: [],
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

function getTaskLabels(board, task) {
    return task.labelIds
        .map((labelId) => {
            const found = board.labels.filter((label) => label._id === labelId)
            return found ? found[0] : null
        })
        .filter((label) => label !== null)
}

function getLabelById(board, labelId) {
    return board.labels.filter((label) => label._id === labelId)[0]
}

function _getDefaultLabels() {
    return [
        {
            _id: 'l101',
            title: '',
            color: '#4bce97',
            colorName: 'Green',
        },
        {
            _id: 'l102',
            title: '',
            color: '#f5cd47',
            colorName: 'Yellow',
        },
        {
            _id: 'l103',
            title: '',
            color: '#fea362',
            colorName: 'Orange',
        },
        {
            _id: 'l104',
            title: '',
            color: '#f87168',
            colorName: 'Red',
        },
        {
            _id: 'l105',
            title: '',
            color: '#9f8fef',
            colorName: 'Purple',
        },
        {
            _id: 'l106',
            title: '',
            color: '#579dff',
            colorName: 'Blue',
        },
    ]
}

function getGroupById(board, groupId) {
    const found = board.groups.filter((g) => g._id === groupId)
    return found ? found[0] : null
}

function getTaskById(board, groupId, taskId) {
    const group = getGroupById(board, groupId)
    return group ? _getTaskByIdInGroup(group, taskId) : null
}

function getChecklistById(board, groupId, taskId, checklistId) {
    const task = getTaskById(board, groupId, taskId)
    return task ? _getChecklistByIdInTask(task, checklistId) : null
}

function getChecklistItemById(board, groupId, taskId, checklistId, itemId) {
    const checklist = getChecklistById(board, groupId, taskId, checklistId)
    return checklist ? _getItemByIdInChecklist(checklist, itemId) : null
}

function _getTaskByIdInGroup(group, taskId) {
    const found = group.tasks.filter((t) => t._id === taskId)
    return found ? found[0] : null
}

function _getChecklistByIdInTask(task, checklistId) {
    const found = task.checklists.filter((c) => c._id === checklistId)
    return found ? found[0] : null
}

function _getItemByIdInChecklist(checklist, itemId) {
    const found = checklist.items.filter((i) => i._id === itemId)
    return found ? found[0] : null
}
