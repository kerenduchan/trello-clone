import { filteredBoardChanged } from '../../reducers/board.reducer'
import { store } from '../../store'

export { applyBoardFilter }

function applyBoardFilter(filter) {
    const board = store.getState().board.curBoard
    if (!board) {
        return null
    }

    // filter out archived groups
    // and filter out archived tasks from each group
    const unarchivedGroups = board.groups
        .filter((g) => !g.archivedAt)
        .map((g) => ({
            ...g,
            tasks: g.tasks.filter((t) => !t.archivedAt),
        }))

    // apply the filter
    const filteredGroups = unarchivedGroups.map((g) =>
        _applyBoardFilterToGroup(g, filter)
    )

    const filteredBoard = { ...board, groups: filteredGroups }
    store.dispatch(filteredBoardChanged(filteredBoard))
}

///////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

function _applyBoardFilterToGroup(group, filter) {
    const filteredTasks = group.tasks.filter((t) =>
        _isTaskMatchFilter(t, filter)
    )
    return { ...group, tasks: filteredTasks }
}

function _isTaskMatchFilter(task, filter) {
    // keyword
    const pattern = new RegExp(filter.txt, 'i')
    if (!task.title.match(pattern)) {
        return false
    }

    // members
    if (!_isTaskMatchMembers(task, filter)) {
        return false
    }

    // due date
    if (!_isTaskMatchDate(task, filter)) {
        return false
    }

    return true
}

function _isTaskMatchMembers(task, filter) {
    const { members } = filter

    if (!members || !members.length) {
        // no member-related filtering
        return true
    }

    if (!task.memberIds || !task.memberIds.length) {
        return members.includes('none')
    }

    return task.memberIds.some((id) => members.includes(id))
}

function _isTaskMatchDate(task, filter) {
    const { complete, notDue, overdue, due } = filter

    if (!complete && !notDue && !overdue && !due) {
        // no date-related filtering
        return true
    }
    const dates = task.dates

    const isMatchComplete = _isDatesMatchComplete(complete, dates)
    const isMatchNotDue = _isDatesMatchNotDue(notDue, dates)
    const isMatchOverdue = _isDatesMatchOverdue(overdue, dates)
    const isMatchDue = _isDatesMatchDue(due, dates)

    return isMatchComplete || isMatchNotDue || isMatchOverdue || isMatchDue
}

function _isDatesMatchComplete(complete, dates) {
    switch (complete) {
        case null:
            // no filtering by complete
            return false
        case true:
            // return true if the dates are marked as complete
            return Boolean(dates?.isComplete)
        case false:
            // return true if there are no dates or they are not marked as complete
            return !dates || !dates.isComplete
    }

    // shouldn't reach here
    console.error('Internal error: complete is', complete)
    return false
}

function _isDatesMatchNotDue(notDue, dates) {
    if (!notDue) {
        // no filtering by not due
        return false
    }
    // return true if there are no dates or if there is no due date
    return !dates || !dates.dueDate
}

function _isDatesMatchOverdue(overdue, dates) {
    if (!overdue || !dates || !dates.dueDate) {
        // no filtering by overdue, or no due date
        return false
    }
    // return true if the due date is overdue
    const delta = dates.dueDate - Math.floor(Date.now() / 1000)

    return delta < 0
}

function _isDatesMatchDue(due, dates) {
    if (!due || !dates || !dates.dueDate) {
        // no filtering by due, or no due date
        return false
    }
    // return true if the due date is overdue
    const delta = dates.dueDate - Math.floor(Date.now() / 1000)

    // number of seconds per hour
    const SECONDS_PER_HOUR = 3600

    const maxDeltaDays = {
        day: 1,
        week: 7,
        month: 30,
    }
    return delta > 0 && delta < maxDeltaDays[due] * 24 * SECONDS_PER_HOUR
}
