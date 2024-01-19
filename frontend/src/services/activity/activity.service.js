import { utilService } from '../util.service'
import { activityAxiosService } from './activity.axios.service'
import { activityLocalService } from './activity.local.service'

const service = utilService.isUseLocalStorage()
    ? activityLocalService
    : activityAxiosService

export const activityService = {
    ...service,
}
