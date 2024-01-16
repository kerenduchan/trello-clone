import { storageService } from '../async-storage.service'
import { authService } from '../auth.service'
import { utilService } from '../util.service'
import { getDemoData } from './board.local.demo.data'

export const boardLocalService = {
    query,
    getById,
    save,
    remove,
    create,
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

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards = getDemoData()
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}
