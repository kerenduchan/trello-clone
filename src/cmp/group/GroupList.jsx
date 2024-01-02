import { GroupPreview } from './GroupPreview'

export function GroupList({ board, groups }) {
    return (
        <ol className="group-list">
            {groups
                .filter((g) => !g.archivedAt)
                .map((g) => (
                    <li key={g._id}>
                        <GroupPreview board={board} group={g} />
                    </li>
                ))}
        </ol>
    )
}
