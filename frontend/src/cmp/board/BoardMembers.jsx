import { BoardMember } from './BoardMember'

export function BoardMembers({ members }) {
    return (
        <div className="board-members">
            {members.map((member, idx) => (
                <BoardMember
                    key={member._id}
                    member={member}
                    members={members}
                    idx={idx}
                />
            ))}
        </div>
    )
}
