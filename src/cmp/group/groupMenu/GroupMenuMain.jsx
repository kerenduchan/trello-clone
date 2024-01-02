export function GroupMenuMain({
    onTaskCreate,
    onCopyGroup,
    onMoveGroup,
    onMoveTasks,
    onArchiveTasks,
    onArchiveGroup,
}) {
    return (
        <div className="group-preview-menu">
            <ul>
                <li className="clickable" onClick={onTaskCreate}>
                    Add Card
                </li>
                <li className="clickable" onClick={onCopyGroup}>
                    Copy list
                </li>
                <li className="clickable" onClick={onMoveGroup}>
                    Move list
                </li>
                <li>
                    <hr />
                </li>
                <li className="clickable" onClick={onMoveTasks}>
                    Move all cards in this list
                </li>
                <li className="clickable" onClick={onArchiveTasks}>
                    Archive all cards in this list
                </li>
                <li>
                    <hr />
                </li>
                <li className="clickable" onClick={onArchiveGroup}>
                    Archive this list
                </li>
            </ul>
        </div>
    )
}
