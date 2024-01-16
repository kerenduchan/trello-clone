import Axios from 'axios'

export const axiosService = {
    getBaseUrl,
}

const axios = Axios.create({
    withCredentials: true,
})

function getBaseUrl() {
    return process.env.NODE_ENV !== 'development'
        ? '/api/'
        : '//localhost:3000/api/'
}

export const utilAxiosService = {
    query,
    getById,
    create,
    update,
    remove,
}

async function query(baseUrl, params = {}) {
    try {
        const { data } = await axios.get(baseUrl, params)
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function getById(baseUrl, id) {
    const url = baseUrl + id

    try {
        const { data } = await axios.get(url)
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function create(baseUrl, entity) {
    try {
        const { data } = await axios.post(baseUrl, entity)
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function update(baseUrl, entity) {
    baseUrl += entity._id

    try {
        const { data } = await axios.put(baseUrl, entity)
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function remove(baseUrl, id) {
    const url = baseUrl + id
    const { data } = await axios.delete(url)
    return data
}
