import { usePopoverState } from '../../customHooks/usePopoverState'
import { updateGroup } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { GroupPreviewMenu } from './GroupPreviewMenu'
import { PopoverMenu } from '../general/PopoverMenu'

export function GroupPreviewHeader({ group, board }) {
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
                <SquareIconBtn
                    {...listActionsMenu.triggerAndTarget}
                    className="more-btn"
                    icon="more"
                />
            </header>

            {/* List Actions menu */}
            {listActionsMenu.show && (
                <PopoverMenu title="List Actions" {...listActionsMenu.popover}>
                    <GroupPreviewMenu
                        board={board}
                        group={group}
                        onClose={listActionsMenu.onClose}
                    />
                </PopoverMenu>
            )}
        </>
    )
}
