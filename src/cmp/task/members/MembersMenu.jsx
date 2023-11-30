import { PopoverMenu } from '../../general/PopoverMenu'
import { MemberBtn } from './MemberBtn'

export function MembersMenu({ hierarchy, popoverState }) {
    const { board } = hierarchy
    return (
        <PopoverMenu
            className="members-menu"
            title="Members"
            {...popoverState.popover}
        >
            <h4>Board members</h4>

            <ul>
                {board.members.map((member) => (
                    <li key={member._id}>
                        <MemberBtn hierarchy={hierarchy} member={member} />
                    </li>
                ))}
            </ul>
        </PopoverMenu>
    )
}
