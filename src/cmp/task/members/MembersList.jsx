import { MemberBtn } from './MemberBtn'

export function MembersList({ hierarchy }) {
    const members = hierarchy.board.members

    return (
        <ul>
            {members.map((m) => (
                <li>
                    <MemberBtn hierarchy={hierarchy} member={m} />
                </li>
            ))}
        </ul>
    )
}
