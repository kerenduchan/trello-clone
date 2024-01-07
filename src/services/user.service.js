import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const userService = { query, getById, save, getByUsername }

const STORAGE_KEY = 'users'

_createUsers()

async function query() {
    return await storageService.query(STORAGE_KEY)
}

async function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

async function getByUsername(username) {
    const allUsers = await query()
    return allUsers.find((user) => user.username === username)
}

function save(userToSave) {
    if (userToSave._id) {
        return storageService.put(STORAGE_KEY, userToSave)
    } else {
        return storageService.post(STORAGE_KEY, userToSave)
    }
}
function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY)
    if (!users || !users.length) {
        users = [
            {
                _id: 'u101',
                username: 'keren',
                fullname: 'Keren Duchan',
                imgUrl: 'images/keren-avatar.jpg',
            },
            {
                _id: 'u102',
                username: 'yigal',
                fullname: 'Yigal Shalom',
                imgUrl: 'images/yigal-avatar.jpg',
            },
        ]
        utilService.saveToStorage(STORAGE_KEY, users)
    }
}
