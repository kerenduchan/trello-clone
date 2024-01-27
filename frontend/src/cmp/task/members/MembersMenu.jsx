import { updateTask } from '../../../store/actions/task/task.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { MemberBtn } from './MemberBtn'

export function MembersMenu({ hierarchy, popoverState }) {
    const { task, board } = hierarchy

    function isTaskMember(member) {
        return task.memberIds?.includes(member._id)
    }

    function onMemberClick(member) {
        const { task } = hierarchy

        if (isTaskMember(member)) {
            const memberIds = task.memberIds.filter((id) => id !== member._id)
            updateTask(hierarchy, { memberIds })
        } else {
            const memberIds = task.memberIds ? [...task.memberIds] : []
            memberIds.push(member._id)
            updateTask(hierarchy, { memberIds })
        }
    }

    return (
        <PopoverMenu
            className="members-menu"
            title="Members"
            {...popoverState.popover}
        >
            <h4>Board members</h4>

            <ul>
                {board.members?.map((member) => (
                    <li key={member._id}>
                        <MemberBtn
                            member={member}
                            isChecked={isTaskMember(member)}
                            onClick={() => onMemberClick(member)}
                        />
                    </li>
                ))}
            </ul>
        </PopoverMenu>
    )
}
