import { deleteChecklistItem } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function ChecklistItemActionsMenu({
    board,
    group,
    task,
    checklist,
    item,
    popoverState,
}) {
    function onConvertToCard() {
        // TODO
    }

    function onDelete() {
        try {
            deleteChecklistItem(board, group, task, checklist, item)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        popoverState.show && (
            <PopoverMenu title="Item actions" {...popoverState.popover}>
                <div className="checklist-item-actions-menu">
                    <SecondaryBtn
                        text="Convert to card"
                        onClick={onConvertToCard}
                    />
                    <SecondaryBtn text="Delete" onClick={onDelete} />
                </div>
            </PopoverMenu>
        )
    )
}
