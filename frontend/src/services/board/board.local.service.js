import { storageService } from '../async-storage.service'
import { authService } from '../auth.service'
import { utilService } from '../util.service'

export const boardLocalService = {
    query,
    getById,
    save,
    remove,
    create,
    getLabelColorById,
    getLabelColors,
}

const STORAGE_KEY = 'boards'

_createBoards()

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
        // this is what the real backend does
        boardToSave.labels = _getDefaultLabels()
        return storageService.post(STORAGE_KEY, boardToSave)
    }
}

async function create(board) {
    return await storageService.post(STORAGE_KEY, board)
}

function getLabelColorById(id) {
    const noLabelColor = getNoLabelColor()
    if (id === noLabelColor._id) {
        return noLabelColor
    }

    return getLabelColors().find((lc) => lc._id === id)
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

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

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

function getNoLabelColor() {
    return _getLabelColor('lc000', 'none', '#091e420f', '#172b4d')
}

function _getLabelColor(_id, name, bgColor, textColor) {
    return { _id, name, bgColor, textColor }
}
