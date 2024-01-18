import { store } from '../../store/store'
import { activityService } from '../activity/activity.service'
import { storageService } from '../async-storage.service'
import { utilService } from '../util.service'
import { getDemoData } from './board.local.demo.data'

export const boardLocalService = {
    query,
    getById,
    create,
    update,
    remove,
}

const STORAGE_KEY = 'boards'

if (utilService.isUseLocalStorage()) {
    _createBoards()
}

async function query() {
    // return only the boards that this user is authorized to view
    const allboards = await storageService.query(STORAGE_KEY)
    const loggedinUser = store.getState().app.loggedinUser
    const boards = allboards.filter((b) =>
        b.members.find((member) => member._id === loggedinUser._id)
    )
    return { data: boards }
}

async function getById(id) {
    // get the board and all of the board's activities
    const board = await storageService.get(STORAGE_KEY, id)
    const activities = await activityService.query({ boardId: id })
    board.activities = activities
    return board
}

async function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

async function update(board) {
    return storageService.put(STORAGE_KEY, board)
}

async function create(board) {
    // this is what the real backend does
    board.labels = _getDefaultLabels()
    return await storageService.post(STORAGE_KEY, board)
}

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = getDemoData()
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}
