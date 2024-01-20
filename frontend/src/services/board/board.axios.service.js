import { axiosService } from '../axios.service'

export const boardAxiosService = {
    query,
    getById,
    create,
    update,
    remove,
}

const BASE_URL = axiosService.getBaseUrl() + 'board/'

async function query() {
    return axiosService.query(BASE_URL)
}

async function getById(id) {
    return axiosService.getById(BASE_URL, id)
}

async function remove(id) {
    return axiosService.remove(BASE_URL, id)
}

async function update(boardId, fields) {
    return axiosService.update(BASE_URL + boardId, fields)
}

async function create(board) {
    return axiosService.create(BASE_URL, board)
}
