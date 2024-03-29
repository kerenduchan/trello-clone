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
            req.body
        )
        res.send(savedActivity)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function removeActivity(req, res) {
    const { activityId } = req.params

    try {
        const result = await activityService.remove(activityId)
        res.send(result)
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
