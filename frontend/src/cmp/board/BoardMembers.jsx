import { usePopoverState } from '../../customHooks/usePopoverState'
import { userService } from '../../services/user/user.service'
import { MemberMenu } from '../task/members/MemberMenu'

export function BoardMembers({ members }) {
    const memberMenu = usePopoverState()

    return (
        <div className="board-members">
            {members.map((member, idx) => (
                <button
                    key={member._id}
                    className="btn-board-member"
                    style={{ zIndex: members.length - idx }}
                    {...memberMenu.triggerAndTarget}
                >
                    <img src={userService.getImgUrl(member)} />
                    <div
                        className="overlay"
                        style={{ zIndex: members.length - idx + 1 }}
                    />

                    {memberMenu.show && (
                        <MemberMenu
                            popover={memberMenu.popover}
                            member={member}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}
