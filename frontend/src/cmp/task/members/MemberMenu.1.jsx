import { userService } from '../../../services/user/user.service'
import { Popover } from '../../general/Popover'

export function MemberMenu({ popover, member }) {
    const { refEl, onClose } = popover

    return (
        <Popover
            className="popover-menu member-menu"
            refEl={refEl}
            onClose={onClose}
        >
            <div className="header">
                <img
                    className="member-avatar"
                    src={userService.getImgUrl(member)}
                />
                <div className="member-info">
                    <div className="fullname">{member.fullname}</div>
                    <div className="username">@{member.username}</div>
                </div>
            </div>
            <div className="content"></div>
        </Popover>
    )
}
