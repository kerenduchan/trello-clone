export function GroupMenuMoveTasks({ board, group, onMoveTasks }) {
    function isClickable(g) {
        return g._id !== group._id
    }

    return (
        <div className="group-menu-move-tasks">
            <ul>
                {board.groups.map((g) => (
                    <li
                        key={g._id}
                        className={
                            isClickable(g)
                                ? 'group-menu-clickable-item'
                                : 'disabled'
                        }
                        onClick={() => onMoveTasks(g._id)}
                    >{`${g.title}${isClickable(g) ? '' : ' (current)'}`}</li>
                ))}
            </ul>
        </div>
    )
}
