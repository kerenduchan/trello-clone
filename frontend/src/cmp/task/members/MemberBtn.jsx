import { userService } from '../../../services/user/user.service'
import { Avatar } from '../../general/Avatar'
import { Icon } from '../../general/Icon'

export function MemberBtn({ member, isChecked, onClick }) {
    return (
        <button className="btn-member" onClick={onClick}>
            <Avatar imgSrc={userService.getImgUrl(member)} />
            <div className="title">{member.fullname}</div>
            {isChecked && <Icon type="check" size="xs" />}
        </button>
    )
}
