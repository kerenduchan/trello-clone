import { taskLocalService } from './task.local.service'

const service = taskLocalService

export const taskService = {
    ...service,
}
