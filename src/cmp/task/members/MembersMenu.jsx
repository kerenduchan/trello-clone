import { PopoverMenu } from '../../general/PopoverMenu'

export function MembersMenu({ hierarchy, popoverState }) {
    return (
        <PopoverMenu
            className="members-menu"
            title="Members"
            {...popoverState.popover}
        >
            <h3>Board members</h3>
        </PopoverMenu>
    )
}
