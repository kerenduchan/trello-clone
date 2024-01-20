import { BoardMenuActivityItem } from './BoardMenuActivityItem'

export function BoardMenuActivityList({ activities }) {
    if (!activities) return <></>

    return (
        <div className="board-menu-activity-list">
            <ul>
                {activities.map((a) => (
                    <li key={a._id} className="activity">
                        <BoardMenuActivityItem activity={a} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
