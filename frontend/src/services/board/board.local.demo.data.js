import { labelService } from '../label.service'

export function getDemoData() {
    return [
        {
            _id: '1234',
            title: 'Greengrocer Shop Web Dev',
            isStarred: false,
            archivedAt: null,
            createdBy: {
                _id: 'u101',
                fullname: 'Keren Duchan',
                username: 'keren',
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
                                bgColor: { color: '#98b5a0' },
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
                            labelIds: ['green', 'red'],
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
                            description: 'Allow a logged-in user to log out',
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
                                bgColor: { color: '#e774bb' },
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
            groups: [],
            labels: _getDefaultLabels(),
            members: [
                {
                    _id: 'u101',
                    fullname: 'Keren Duchan',
                    username: 'keren',
                    imgUrl: 'images/keren-avatar.jpg',
                },
            ],
            createdBy: {
                _id: 'u102',
                fullname: 'Yigal Shalom',
                username: 'yigal',
                imgUrl: 'images/yigal-avatar.jpg',
            },
            style: {
                backgroundImage:
                    'https://images.unsplash.com/photo-1699116548123-73affe0987b7',
            },
        },
    ]
}

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

function _getDefaultLabels() {
    const defaultColorIds = [
        'green',
        'yellow',
        'orange',
        'red',
        'purple',
        'blue',
    ]

    return defaultColorIds.map((colorId) => ({
        _id: colorId,
        title: '',
        colorId,
        color: labelService.getLabelColorById(colorId),
    }))
}
