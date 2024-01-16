import { groupService } from './group.service.js'

export async function getGroup(req, res) {
    try {
        const { boardId, groupId } = req.params
        const group = await groupService.getById(boardId, groupId)
        res.send(group)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function createGroup(req, res) {
    try {
        const boardId = req.params.boardId
        const group = req.body
        const savedGroup = await groupService.create(boardId, group)
        res.send(savedGroup)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function updateGroup(req, res) {
    try {
        const { boardId, groupId } = req.params
        const fields = req.body
        const updatedGroup = await groupService.update(boardId, groupId, fields)
        res.send(updatedGroup)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function removeGroup(req, res) {
    const { boardId, groupId } = req.params

    try {
        const result = await groupService.remove(boardId, groupId)
        res.send(result)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}
