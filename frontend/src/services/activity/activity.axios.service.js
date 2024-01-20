import { axiosService } from '../axios.service'

export const activityAxiosService = {
    query,
    create,
    update,
    remove,
}

const BASE_URL = axiosService.getBaseUrl() + 'activity/'

async function query() {
    return axiosService.query(BASE_URL)
}

async function remove(id) {
    return axiosService.remove(BASE_URL, id)
}

async function update(activityId, fields) {
    return axiosService.update(BASE_URL + activityId, fields)
}

async function create(activity) {
    return axiosService.create(BASE_URL, activity)
}
