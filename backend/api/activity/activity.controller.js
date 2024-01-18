import { utilService } from '../../services/util.service.js'
import { activityService } from './activity.service.js'

export async function getActivities(req, res) {
    try {
        const { boardId } = req.params
        let query = {
            ...req.query,
            boardId,
        }
        const filterBy = _buildFilter(query)
        const data = await activityService.query(filterBy)
        res.send(data)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

function _buildFilter(query) {
    const { boardId } = query

    const filter = {
        boardId,
    }

    return utilService.removeNullAndUndefined(filter)
}
