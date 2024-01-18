import { userService } from '../../../services/user/user.service'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { Avatar } from '../../general/Avatar'
import { MemberMenu } from '../members/MemberMenu'

export function MembersWidgetItem({ hierarchy, member }) {
    const memberMenu = usePopoverState()

    return (
        <button
            className="members-widget-item"
            {...memberMenu.triggerAndTarget}
        >
            <Avatar imgSrc={userService.getImgUrl(member)} />
            {memberMenu.show && (
                <MemberMenu popover={memberMenu.popover} member={member} />
            )}
        </button>
    )
}
