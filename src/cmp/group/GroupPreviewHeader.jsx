import { updateGroup } from '../../store/actions/board.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { EditableTitle } from '../general/EditableTitle'
import { Icon } from '../general/Icon'
import { GroupMenu } from './groupMenu/groupMenu'

export function GroupPreviewHeader({ board, group, onTaskCreate }) {
    const groupMenu = usePopoverState()

    function onTitleChange(title) {
        try {
            updateGroup(board, group, { title })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <header className="group-preview-header">
            <EditableTitle title={group.title} onChange={onTitleChange} />

            <button
                className="btn-square btn-more"
                {...groupMenu.triggerAndTarget}
            >
                <Icon type="more" />
            </button>

            {/* Group menu */}
            {groupMenu.show && (
                <GroupMenu
                    popoverState={groupMenu}
                    onTaskCreate={onTaskCreate}
                    onClose={groupMenu.onClose}
                />
            )}
        </header>
    )
}
