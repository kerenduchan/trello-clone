import { utilService } from '../util.service'
import { authUtilService } from './auth.util.service'
import { authAxiosService } from './auth.axios.service'
import { authLocalService } from './auth.local.service'

const service = utilService.isUseLocalStorage()
    ? authLocalService
    : authAxiosService

export const authService = {
    ...service,
    ...authUtilService,
}
