import {
    convertChecklistItemToTask,
    deleteChecklistItem,
} from '../../../store/actions/task/task.checklist.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function ChecklistItemActionsMenu({
    hierarchy,
    checklist,
    item,
    popoverState,
}) {
    async function onConvertToTask() {
        try {
            convertChecklistItemToTask(hierarchy, checklist, item)
        } catch (err) {
            // TODO: show an error dialog
            console.error(err)
        }
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
                    className="btn-actions-menu"
                    text="Convert to card"
                    onClick={onConvertToTask}
                />
                <SecondaryBtn
                    className="btn-actions-menu"
                    text="Delete"
                    onClick={onDelete}
                />
            </PopoverMenu>
        )
    )
}
