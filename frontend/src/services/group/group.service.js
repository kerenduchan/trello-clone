import { groupAxiosService } from './group.axios.service'
import { groupLocalService } from './group.local.service'

// change to true in order to work with local storage instead of server
const USE_LOCAL = false

const service = USE_LOCAL ? groupLocalService : groupAxiosService

export const groupService = {
    ...service,
}
