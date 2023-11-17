export { getBoards, getBoard }

function getBoards() {
    return _boards
}

function getBoard(_id) {
    return _boards.filter((b) => b._id === _id)[0]
}

const _boards = [
    { _id: '1234', name: 'Gmail Clone Project' },
    { _id: '1235', name: 'Personal Board' },
]
