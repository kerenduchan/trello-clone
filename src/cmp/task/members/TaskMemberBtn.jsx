import { Avatar } from '../../general/Avatar'

export function TaskMemberBtn({ hierarchy, member }) {
    return (
        <button className="task-member-btn">
            <Avatar imgSrc={member.imgUrl} />
        </button>
    )
}
