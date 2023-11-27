import { usePopoverState } from '../../customHooks/usePopoverState'
import { updateBoard } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { GroupPreviewMenu } from './GroupPreviewMenu'
import { PopoverMenu } from '../general/PopoverMenu'
import { boardService } from '../../services/board.service'

export function GroupPreviewHeader({ group, board }) {
    const listActionsMenu = usePopoverState()

    function onTitleChange(title) {
        // change the title of this group in the board
        const boardClone = structuredClone(board)
        const groupClone = boardService.getGroupById(boardClone, group._id)
        groupClone.title = title
        updateBoard(boardClone)
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
