import { store } from '../store'
import {
    activityCreated,
    groupCreated,
    groupUpdated,
} from '../reducers/board.reducer'
import { groupService } from '../../services/group/group.service'
import { activityUtilService } from '../../services/activity/activity.util.service'
import { socketService } from '../../services/socket.service'

export { createGroup, deleteGroup, updateGroup }

async function createGroup(board, group) {
    try {
        // optimistic update
        store.dispatch(groupCreated({ board, group }))

        // mimic what the server does upon create group
        const activity = activityUtilService.getGroupActivity(
            'group-created',
            board,
            group
        )
        store.dispatch(activityCreated({ activity }))

        await groupService.createGroup(board, group)
        socketService.notifyBoardUpdated(board._id)
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
        socketService.notifyBoardUpdated(board._id)
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

        // mimic what the server does upon update task
        _createActivityForUpdateGroup(board, group, fieldsToUpdate)

        await groupService.updateGroup(board, group._id, fieldsToUpdate)
        socketService.notifyBoardUpdated(board._id)
    } catch (err) {
        // TODO: rollback store change
        throw err
    }
}

function _createActivityForUpdateGroup(board, group, fieldsToUpdate) {
    let type
    if ('archivedAt' in fieldsToUpdate) {
        type = fieldsToUpdate.archivedAt ? 'group-archived' : 'group-unarchived'
    }

    if (type) {
        const activity = activityUtilService.getGroupActivity(
            type,
            board,
            group
        )

        store.dispatch(activityCreated({ activity }))
    }
}
