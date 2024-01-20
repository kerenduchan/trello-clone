import { getActivities } from '../activity/activity.controller.js'
import { taskService } from './task.service.js'

export async function getTask(req, res) {
    const { boardId, groupId, taskId } = req.params

    try {
        const task = await taskService.getById(boardId, groupId, taskId)
        res.send(task)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function getTaskActivities(req, res) {
    const { boardId, groupId, taskId } = req.params
    req.query = { ...req.query, boardId, groupId, taskId }
    return await getActivities(req, res)
}

export async function createTask(req, res) {
    try {
        const { boardId, groupId } = req.params
        const task = { ...req.body, creatorId: req.loggedinUser._id }
        const savedTask = await taskService.create(boardId, groupId, task)
        res.send(savedTask)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function updateTask(req, res) {
    try {
        const { boardId, groupId, taskId } = req.params
        const fields = req.body
        const updatedTask = await taskService.update(
            req.loggedinUser._id,
            boardId,
            groupId,
            taskId,
            fields
        )
        res.send(updatedTask)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function deleteTask(req, res) {
    try {
        const { boardId, groupId, taskId } = req.params
        const result = await taskService.remove(
            req.loggedinUser._id,
            boardId,
            groupId,
            taskId
        )
        res.send(result)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}
