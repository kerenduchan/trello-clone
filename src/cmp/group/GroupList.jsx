import { GroupPreview } from './GroupPreview'

export function GroupList({ board, groups }) {
    return (
        <ol className="group-list">
            {groups.map((g, index) => (
                <li key={g._id}>
                    <GroupPreview board={board} group={g} index={index} />
                </li>
            ))}
        </ol>
    )
}
