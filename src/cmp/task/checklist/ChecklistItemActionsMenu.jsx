import { deleteChecklistItem } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function ChecklistItemActionsMenu({
    hierarchy,
    checklist,
    item,
    popoverState,
}) {
    function onConvertToCard() {
        // TODO
    }

    function onDelete() {
        try {
            deleteChecklistItem(hierarchy, checklist, item)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        popoverState.show && (
            <PopoverMenu
                className="checklist-item-actions-menu"
                title="Item actions"
                {...popoverState.popover}
            >
                <SecondaryBtn
                    className="actions-menu-btn"
                    text="Convert to card"
                    onClick={onConvertToCard}
                />
                <SecondaryBtn
                    className="actions-menu-btn"
                    text="Delete"
                    onClick={onDelete}
                />
            </PopoverMenu>
        )
    )
}
