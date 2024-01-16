import { updateTask } from '../../../store/actions/task/task.actions'
import { Avatar } from '../../general/Avatar'
import { Icon } from '../../general/Icon'

export function MemberBtn({ hierarchy, member }) {
    const { task } = hierarchy

    function isTaskMember() {
        return task.memberIds?.includes(member._id)
    }

    function onClick() {
        const { task } = hierarchy

        if (isTaskMember()) {
            const memberIds = task.memberIds.filter((id) => id !== member._id)
            updateTask(hierarchy, { memberIds })
        } else {
            const memberIds = task.memberIds ? [...task.memberIds] : []
            memberIds.push(member._id)
            updateTask(hierarchy, { memberIds })
        }
    }

    return (
        <button className="btn-member" onClick={onClick}>
            <Avatar imgSrc={member.imgUrl} />
            <div className="title">{member.fullname}</div>
            {isTaskMember() && <Icon type="check" size="xs" />}
        </button>
    )
}
