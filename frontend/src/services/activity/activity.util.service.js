import { store } from '../../store/store'
import { utilService } from '../util.service'

export const activityUtilService = {
    getTaskActivity,
    getChecklistActivity,
    getGroupActivity,
}

function getTaskActivity(type, hierarchy) {
    const { board, group, task } = hierarchy
    return {
        _id: utilService.makeId(),
        userId: store.getState().app.loggedinUser._id,
        type,
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        taskTitle: task.title,
        groupTitle: group.title,
    }
}

function getChecklistActivity(type, hierarchy, checklist) {
    const { board, group, task } = hierarchy
    return {
        _id: utilService.makeId(),
        userId: store.getState().app.loggedinUser._id,
        type,
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        taskId: task._id,
        checklistId: checklist._id,
        checklistTitle: checklist.title,
        taskTitle: task.title,
    }
}

function getGroupActivity(type, board, group) {
    return {
        _id: utilService.makeId(),
        userId: store.getState().app.loggedinUser._id,
        type,
        performedAt: Date.now(),
        boardId: board._id,
        groupId: group._id,
        groupTitle: group.title,
    }
}
