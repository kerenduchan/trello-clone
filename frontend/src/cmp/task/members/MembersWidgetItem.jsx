import { userService } from '../../../services/user/user.service'
import { Avatar } from '../../general/Avatar'

export function MembersWidgetItem({ hierarchy, member }) {
    return (
        <button className="members-widget-item">
            <Avatar imgSrc={userService.getImgUrl(member)} />
        </button>
    )
}
