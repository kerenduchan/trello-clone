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
                createdBy: {
                    _id: 'u101',
                    fullname: 'Keren Duchan',
                    imgUrl: 'http://some-img',
                },
                style: {
                    backgroundImage:
                        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/74f86385ffe74500fbb085bdcc036411/photo-1699393393028-d44da72dba1d.jpg',
                },

                taskGroups: [
                    {
                        _id: 'g101',
                        title: 'Backlog: Server',
                        archivedAt: null,
                        tasks: [
                            {
                                _id: 'c101',
                                title: 'Design Web API',
                                cover: {
                                    bgColor: '#98b5a0',
                                },
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
                        tasks: [
                            {
                                _id: 'c103',
                                title: 'Log out functionality',
                                description:
                                    'Allow a logged-in user to log out',
                            },
                            {
                                _id: 'c104',
                                title: 'Filter products',
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
                taskGroups: [],
                createdBy: {
                    _id: 'u102',
                    fullname: 'Yigal Shalom',
                    imgUrl: 'http://some-img',
                },
                style: {
                    backgroundImage:
                        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1281x1920/efadbb633bd12e458df6f40484b34d14/photo-1699116548123-73affe0987b7.jpg',
                },
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}
