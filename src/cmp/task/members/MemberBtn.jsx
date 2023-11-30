import {
    addTaskMember,
    removeTaskMember,
} from '../../../store/actions/board.actions'
import { Avatar } from '../../general/Avatar'
import { Icon } from '../../general/Icon'

export function MemberBtn({ hierarchy, member }) {
    const { task } = hierarchy

    function isTaskMember() {
        return task.memberIds?.includes(member._id)
    }

    function onClick() {
        if (isTaskMember()) {
            removeTaskMember(hierarchy, member)
        } else {
            addTaskMember(hierarchy, member)
        }
    }

    return (
        <button className="member-btn" onClick={onClick}>
            <Avatar imgSrc={member.imgUrl} />
            <div className="title">{member.fullname}</div>
            {isTaskMember() && <Icon type="check" size="xs" />}
        </button>
    )
}
