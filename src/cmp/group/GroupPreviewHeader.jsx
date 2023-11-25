import { usePopoverState } from '../../customHooks/usePopoverState'
import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'
import { EditableTitle } from '../general/EditableTitle'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { GroupPreviewMenu } from './GroupPreviewMenu'
import { PopoverMenu } from '../general/PopoverMenu'

export function GroupPreviewHeader({ group, board }) {
    const listActionsMenu = usePopoverState()

    function onTitleChange(title) {
        // change the title of this group in the board
        const boardClone = deepClone(board)
        const groupClone = boardClone.groups.filter(
            (g) => g._id === group._id
        )[0]
        groupClone.title = title
        updateBoard(boardClone)
    }

    return (
        <>
            <header className="group-preview-header">
                <EditableTitle title={group.title} onChange={onTitleChange} />
                <SquareIconBtn
                    {...listActionsMenu.trigger}
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
