import { utilService } from '../../services/util.service.js'
import { activityService } from './activity.service.js'

export async function getActivities(req, res) {
    try {
        const filterBy = _buildFilter(req.query)
        const data = await activityService.query(filterBy)
        res.send(data)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function createActivity(req, res) {
    try {
        const activity = { ...req.body, userId: req.loggedinUser._id }
        const savedActivity = await activityService.create(activity)
        res.send(savedActivity)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function updateActivity(req, res) {
    try {
        const savedActivity = await activityService.update(
            req.params.activityId,
            fields
        )
        res.send(savedActivity)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

function _buildFilter(query) {
    const { boardId, groupId, taskId } = query

    const filter = {
        boardId,
        groupId,
        taskId,
    }

    return utilService.removeNullAndUndefined(filter)
}
