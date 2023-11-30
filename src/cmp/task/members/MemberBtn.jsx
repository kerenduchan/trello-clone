import { Avatar } from '../../general/Avatar'

export function MemberBtn({ hierarchy, member }) {
    return (
        <button className="member-btn">
            <Avatar imgSrc={member.imgUrl} />
            <div className="title">{member.fullname}</div>
        </button>
    )
}
