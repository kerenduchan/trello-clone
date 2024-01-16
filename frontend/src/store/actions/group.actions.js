import { store } from '../store'
import { groupCreated, groupUpdated } from '../reducers/board.reducer'
import { groupService } from '../../services/group/group.service'

export { createGroup, deleteGroup, updateGroup }

async function createGroup(board, group) {
    try {
        // optimistic update
        store.dispatch(groupCreated({ board, group }))
        await groupService.createGroup(board, group)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function deleteGroup(board, group) {
    try {
        // optimistic update
        store.dispatch(groupDeleted({ board, group }))
        await groupService.deleteGroup(board, group)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function updateGroup(board, group, fieldsToUpdate) {
    const updatedGroup = { ...group, ...fieldsToUpdate }

    try {
        // optimistic update
        store.dispatch(groupUpdated({ board, group: updatedGroup }))
        await groupService.updateGroup(board, updatedGroup)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}
