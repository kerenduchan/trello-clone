import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const boardService = {
    query,
    getById,
    save,
    remove,
    create,
}

const STORAGE_KEY = 'boards'

_createBoards()

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
    if (robotToboardToSaveSave.id) {
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
                groups: [
                    {
                        _id: 'g101',
                        title: 'Backlog: Server',
                        archivedAt: null,
                        cards: [
                            {
                                _id: 'c101',
                                title: 'Design Web API',
                            },
                            {
                                _id: 'c102',
                                title: 'Install nodeJS',
                            },
                        ],
                    },
                    {
                        _id: 'g102',
                        title: 'Backlog: Client',
                        archivedAt: null,
                        cards: [
                            {
                                _id: 'c103',
                                title: 'Log out functionality',
                            },
                            {
                                _id: 'c104',
                                title: 'Filter products',
                            },
                        ],
                    },
                ],
            },
            {
                _id: '1235',
                title: 'Personal Board',
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}
