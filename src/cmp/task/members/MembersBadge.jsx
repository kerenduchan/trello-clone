import { boardService } from '../../../services/board.service'
import { Avatar } from '../../general/Avatar'

export function MembersBadge({ hierarchy }) {
    const members = boardService.getTaskMembers(hierarchy)

    return (
        <>
            {!!members?.length && (
                <div className="members-badge">
                    <ul>
                        {members.map((member) => (
                            <li key={member._id}>
                                <Avatar imgSrc={member.imgUrl} size="xs" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
