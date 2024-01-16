import { utilService } from '../util.service'
import { taskAxiosService } from './task.axios.service'
import { taskLocalService } from './task.local.service'

const service = utilService.isUseLocalStorage()
    ? taskLocalService
    : taskAxiosService

export const taskService = {
    ...service,
}
