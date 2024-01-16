import { authUtilService } from './auth.util.service'
import { authAxiosService } from './auth.axios.service'
import { authLocalService } from './auth.local.service'

// change to true in order to work with local storage instead of server
const USE_LOCAL = false

const service = USE_LOCAL ? authLocalService : authAxiosService

export const authService = {
    ...service,
    ...authUtilService,
}
