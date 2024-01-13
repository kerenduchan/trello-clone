import { store } from '../store'
import { groupCreated, groupUpdated } from '../reducers/board.reducer'
import { groupService } from '../../services/group.service'

export { createGroup, deleteGroup, updateGroup }

async function createGroup(boardId, group) {
    try {
        // optimistic update
        store.dispatch(groupCreated({ boardId, group }))
        await groupService.createGroup(boardId, group)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function deleteGroup(boardId, groupId) {
    try {
        // optimistic update
        store.dispatch(groupDeleted({ boardId, groupId }))
        await groupService.deleteGroup(boardId, groupId)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

async function updateGroup(boardId, group, fieldsToUpdate) {
    const updatedGroup = { ...group, ...fieldsToUpdate }

    try {
        // optimistic update
        store.dispatch(groupUpdated({ boardId, group: updatedGroup }))
        await groupService.updateGroup(boardId, updatedGroup)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}
