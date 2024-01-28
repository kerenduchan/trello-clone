import Axios from 'axios'
import { axiosService } from '../axios.service'
import { authUtilService } from './auth.util.service'

export const authAxiosService = {
    login,
    logout,
    signup,
}

const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = axiosService.getBaseUrl() + 'auth/'

async function login(user) {
    try {
        const { data } = await axios.post(BASE_URL + 'login', user)
        authUtilService.saveLoggedinUser(data)
        return data
    } catch (err) {
        console.error(err)
        throw err.response.data.error
    }
}

async function logout() {
    try {
        await axios.post(BASE_URL + 'logout')
        authUtilService.clearLoggedinUser()
    } catch (err) {
        console.error(err)
        throw err.response.data.error
    }
}

async function signup(user) {
    try {
        const { data } = await axios.post(BASE_URL + 'signup', user)
        authUtilService.saveLoggedinUser(data)
        return data
    } catch (err) {
        console.error(err)
        throw err.response.data.error
    }
}
