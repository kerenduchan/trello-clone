import { PopoverMenu } from '../general/PopoverMenu'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'

export function ChecklistItemActionsMenu({ popoverState }) {
    function onConvertToCard() {
        // TODO
    }

    function onDelete() {}

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
