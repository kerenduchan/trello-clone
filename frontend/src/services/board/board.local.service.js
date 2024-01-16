import { storageService } from '../async-storage.service'
import { authService } from '../auth/auth.service'
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

_createBoards()

async function query() {
    // return only the boards that this user is authorized to view
    const allboards = await storageService.query(STORAGE_KEY)
    const loggedinUser = authService.getLoggedinUser()
    const boards = allboards.filter((b) =>
        b.members.find((member) => member._id === loggedinUser._id)
    )
    return { data: boards }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function update(board) {
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
