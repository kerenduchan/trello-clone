import { utilService } from '../util.service'
import { userAxiosService } from './user.axios.service'
import { userLocalService } from './user.local.service'

const service = utilService.isUseLocalStorage()
    ? userLocalService
    : userAxiosService

export const userService = {
    ...service,
}
