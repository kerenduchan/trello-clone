import { boardService } from '../../../services/board/board.service'
import { userService } from '../../../services/user/user.service'
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
                                <Avatar
                                    imgSrc={userService.getImgUrl(member)}
                                    size="xs"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
