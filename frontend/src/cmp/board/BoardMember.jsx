import { usePopoverState } from '../../customHooks/usePopoverState'
import { userService } from '../../services/user/user.service'
import { MemberMenu } from '../task/members/MemberMenu'

export function BoardMember({ members, member, idx }) {
    const memberMenu = usePopoverState()

    return (
        <button
            className="board-member"
            style={{ zIndex: members.length - idx }}
            {...memberMenu.triggerAndTarget}
        >
            <img src={userService.getImgUrl(member)} />
            <div
                className="overlay"
                style={{ zIndex: members.length - idx + 1 }}
            />

            {memberMenu.show && (
                <MemberMenu popover={memberMenu.popover} member={member} />
            )}
        </button>
    )
}
