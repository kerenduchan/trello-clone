import { usePopoverState } from '../../customHooks/usePopoverState'
import { updateGroup } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { GroupPreviewMenu } from './GroupPreviewMenu'
import { PopoverMenu } from '../general/PopoverMenu'
import { Icon } from '../general/Icon'

export function GroupPreviewHeader({ board, group, onTaskCreate }) {
    const listActionsMenu = usePopoverState()

    function onTitleChange(title) {
        try {
            updateGroup(board, group, { title })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <>
            <header className="group-preview-header">
                <EditableTitle title={group.title} onChange={onTitleChange} />

                <button
                    className="btn-square btn-more"
                    {...listActionsMenu.triggerAndTarget}
                >
                    <Icon type="more" />
                </button>
            </header>

            {/* List Actions menu */}
            {listActionsMenu.show && (
                <PopoverMenu title="List Actions" {...listActionsMenu.popover}>
                    <GroupPreviewMenu
                        board={board}
                        group={group}
                        onClose={listActionsMenu.onClose}
                        onTaskCreate={() => onTaskCreate(0)}
                    />
                </PopoverMenu>
            )}
        </>
    )
}
