import { utilService } from '../util.service'
import { groupAxiosService } from './group.axios.service'
import { groupLocalService } from './group.local.service'

const service = utilService.isUseLocalStorage()
    ? groupLocalService
    : groupAxiosService

export const groupService = {
    ...service,
}
