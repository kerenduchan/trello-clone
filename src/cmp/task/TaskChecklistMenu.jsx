import { PopoverMenu } from '../general/PopoverMenu'

export function TaskChecklistMenu({ checklistMenu }) {
    return (
        <PopoverMenu title="Add checklist" {...checklistMenu.popover}>
            Hi
        </PopoverMenu>
    )
}
