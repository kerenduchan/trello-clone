import { PopoverMenu } from '../../general/PopoverMenu'
import { MembersList } from './MembersList'

export function MembersMenu({ hierarchy, popoverState }) {
    return (
        <PopoverMenu
            className="members-menu"
            title="Members"
            {...popoverState.popover}
        >
            <h3>Board members</h3>

            <MembersList hierarchy={hierarchy} />
        </PopoverMenu>
    )
}
