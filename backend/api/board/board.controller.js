// Board CRUDL API
import { utilService } from '../../services/util.service.js'
import { boardService } from './board.service.js'
import { getActivities } from '../activity/activity.controller.js'

export async function getBoards(req, res) {
    try {
        // only get the logged-in user's boards
        let query = { ...req.query, loggedinUserId: req.loggedinUser._id }
        const filterBy = _buildFilter(query)
        const { sortBy, sortDir, pageIdx, pageSize } = query
        const data = await boardService.query(
            filterBy,
            sortBy,
            utilService.toNumber(sortDir),
            utilService.toNumber(pageIdx),
            utilService.toNumber(pageSize)
        )
        res.send(data)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function getBoardCount(req, res) {
    try {
        let query = { ...req.query, loggedinUserId: req.loggedinUser._id }
        const filterBy = _buildFilter(query)
        const count = await boardService.count(filterBy)
        res.send({ count })
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function getBoard(req, res) {
    const { boardId } = req.params

    try {
        const board = await boardService.getById(boardId)
        res.send(board)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function getBoardActivities(req, res) {
    const { boardId } = req.params
    req.query.boardId = boardId
    return await getActivities(req, res)
}

export async function removeBoard(req, res) {
    const { boardId } = req.params

    try {
        const result = await boardService.remove(boardId)
        res.send(result)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function createBoard(req, res) {
    try {
        const board = { ...req.body, creatorId: req.loggedinUser._id }
        const savedBoard = await boardService.create(board)
        res.send(savedBoard)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}

export async function updateBoard(req, res) {
    try {
        const savedBoard = await boardService.update(
            req.params.boardId,
            req.body
        )
        res.send(savedBoard)
    } catch (err) {
        if (err.stack) console.error(err.stack)
        res.status(400).send({ error: err })
    }
}
function _buildFilter(query) {
    const { loggedinUserId } = query

    const filter = {
        loggedinUserId,
    }

    return utilService.removeNullAndUndefined(filter)
}
