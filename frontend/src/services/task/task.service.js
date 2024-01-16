import { taskAxiosService } from './task.axios.service'
import { taskLocalService } from './task.local.service'

// change to true in order to work with local storage instead of server
const USE_LOCAL = false

const service = USE_LOCAL ? taskLocalService : taskAxiosService

export const taskService = {
    ...service,
}
