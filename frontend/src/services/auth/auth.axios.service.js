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
    const { data: res } = await axios.post(BASE_URL + 'login', user)
    authUtilService.saveLoggedinUser(res)
}

async function logout() {
    await axios.post(BASE_URL + 'logout')
    authUtilService.clearLoggedinUser()
}

async function signup(user) {
    const { data: res } = await axios.post(BASE_URL + 'signup', user)
    authUtilService.saveLoggedinUser(res)
    return res
}
