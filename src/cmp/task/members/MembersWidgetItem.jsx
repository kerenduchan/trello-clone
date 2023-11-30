import { Avatar } from '../../general/Avatar'

export function MembersWidgetItem({ hierarchy, member }) {
    return (
        <button className="members-widget-item">
            <Avatar imgSrc={member.imgUrl} />
        </button>
    )
}
