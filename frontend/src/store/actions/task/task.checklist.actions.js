import { store } from '../../store'
import { curChecklistChanged } from '../../reducers/app.reducer'
import { updateGroup } from '../group.actions'
import { updateTask } from './task.actions'
import { boardService } from '../../../services/board/board.service'
import { activityUtilService } from '../../../services/activity/activity.util.service'

export {
    addChecklist,
    updateChecklist,
    deleteChecklist,
    moveChecklist,
    addChecklistItem,
    updateChecklistItem,
    moveChecklistItem,
    deleteChecklistItem,
    convertChecklistItemToTask,
}

async function addChecklist(hierarchy, checklist) {
    const { task } = hierarchy
    const checklists = [...task.checklists, checklist]
    store.dispatch(curChecklistChanged(checklist._id))

    const activity = activityUtilService.getChecklistActivity(
        'task-checklist-created',
        hierarchy,
        checklist
    )
    return updateTask(hierarchy, { checklists }, activity)
}

async function updateChecklist(hierarchy, checklist) {
    const { task } = hierarchy
    const checklists = task.checklists.map((cl) =>
        cl._id === checklist._id ? checklist : cl
    )
    return updateTask(hierarchy, { checklists })
}

async function deleteChecklist(hierarchy, checklist) {
    const { task } = hierarchy
    const checklists = task.checklists.filter((c) => c._id !== checklist._id)

    const activity = activityUtilService.getChecklistActivity(
        'task-checklist-deleted',
        hierarchy,
        checklist
    )
    return updateTask(hierarchy, { checklists }, activity)
}

async function moveChecklist(hierarchy, checklistId, targetPositionId) {
    const { task } = hierarchy
    const checklistToMove = task.checklists.find((c) => c._id === checklistId)
    let checklists = [...task.checklists]
    checklists = task.checklists.filter((c) => c._id !== checklistId)
    checklists.splice(targetPositionId, 0, checklistToMove)
    return updateTask(hierarchy, { checklists })
}

async function addChecklistItem(hierarchy, checklist, item) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = [...checklist.items, item]
    _updateChecklist(hierarchy, checklistToUpdate)
}

async function updateChecklistItem(hierarchy, checklist, item, fieldsToUpdate) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.map((i) =>
        i._id === item._id ? { ...item, ...fieldsToUpdate } : i
    )
    _updateChecklist(hierarchy, checklistToUpdate)
}

async function moveChecklistItem(
    hierarchy,
    sourceChecklist,
    targetChecklistId,
    itemId,
    targetIndex
) {
    if (targetChecklistId === sourceChecklist._id) {
        await _moveChecklistItemInSameChecklist(
            hierarchy,
            sourceChecklist,
            itemId,
            targetIndex
        )
    } else {
        await _moveChecklistItemToAnotherChecklist(
            hierarchy,
            sourceChecklist,
            targetChecklistId,
            itemId,
            targetIndex
        )
    }
}

async function deleteChecklistItem(hierarchy, checklist, item) {
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.filter((i) => i._id !== item._id)
    _updateChecklist(hierarchy, checklistToUpdate)
}

async function convertChecklistItemToTask(hierarchy, checklist, item) {
    const { board, group, task } = hierarchy

    // Add a new task to the group
    const newTask = boardService.getEmptyTask(item.title)
    let tasks = [...group.tasks, newTask]

    // remove the checklist item from the checklist
    const checklistToUpdate = { ...checklist }
    checklistToUpdate.items = checklist.items.filter((i) => i._id !== item._id)

    // update the checklists in the original task
    const taskToUpdate = { ...task }
    taskToUpdate.checklists = task.checklists.map((c) =>
        c._id === checklistToUpdate._id ? checklistToUpdate : c
    )

    // update the original task in the new list of tasks
    tasks = tasks.map((t) => (t._id === taskToUpdate._id ? taskToUpdate : t))

    updateGroup(board, group, { tasks })
}

////////////////////////////////////////////////////////////////////////////////
// PRIVATE HELPER FUNCTIONS

async function _updateChecklist(hierarchy, checklist) {
    const { task } = hierarchy
    const checklists = task.checklists.map((cl) =>
        cl._id === checklist._id ? checklist : cl
    )
    updateTask(hierarchy, { checklists })
}

async function _moveChecklistItemInSameChecklist(
    hierarchy,
    checklist,
    itemId,
    targetIndex
) {
    const { task } = hierarchy
    const itemToMove = checklist.items.find((i) => i._id === itemId)
    let updatedItems = checklist.items.filter((i) => i._id !== itemId)
    updatedItems.splice(targetIndex, 0, itemToMove)
    const updatedChecklist = { ...checklist, items: updatedItems }
    const updatedChecklists = task.checklists.map((cl) =>
        cl._id === checklist._id ? updatedChecklist : cl
    )
    return updateTask(hierarchy, { checklists: updatedChecklists })
}

async function _moveChecklistItemToAnotherChecklist(
    hierarchy,
    sourceChecklist,
    targetChecklistId,
    itemId,
    targetIndex
) {
    const { task } = hierarchy

    // get item to move and remove it from the source checklist
    const itemToMove = sourceChecklist.items.find((i) => i._id === itemId)
    const updatedSourceItems = sourceChecklist.items.filter(
        (i) => i._id !== itemId
    )
    const updatedSourceChecklist = {
        ...sourceChecklist,
        items: updatedSourceItems,
    }

    // find target checklist and add item to it
    const targetChecklist = task.checklists.find(
        (cl) => cl._id === targetChecklistId
    )
    let targetItems = [...targetChecklist.items]
    targetItems.splice(targetIndex, 0, itemToMove)
    const updatedTargetChecklist = {
        ...targetChecklist,
        items: targetItems,
    }

    const updatedChecklists = task.checklists.map((cl) =>
        cl._id === sourceChecklist._id
            ? updatedSourceChecklist
            : cl._id === targetChecklistId
            ? updatedTargetChecklist
            : cl
    )
    return updateTask(hierarchy, { checklists: updatedChecklists })
}
