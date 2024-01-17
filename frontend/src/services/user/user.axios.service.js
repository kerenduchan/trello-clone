import Axios from 'axios'
import { axiosService } from '../axios.service'

export const userAxiosService = { getByUsername }

const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = axiosService.getBaseUrl() + 'user/'

async function getByUsername(username) {
    try {
        const { data } = await axios.get(BASE_URL, username)
        return data
    } catch (err) {
        console.error(err)
        throw err.response.data.error
    }
}
