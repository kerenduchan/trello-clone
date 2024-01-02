export function GroupMenuMain({
    onTaskCreate,
    onCopyGroup,
    onMoveGroup,
    onMoveTasks,
    onArchiveTasks,
    onArchiveGroup,
}) {
    const items = [
        { id: 1, title: 'Add Card', onClick: onTaskCreate },
        { id: 2, title: 'Copy list', onClick: onCopyGroup },
        { id: 3, title: 'Move list', onClick: onMoveGroup },
        { id: 4, hr: true },
        { id: 5, title: 'Move all cards in this list', onClick: onMoveTasks },
        {
            id: 6,
            title: 'Archive all cards in this list',
            onClick: onArchiveTasks,
        },
        { id: 7, hr: true },
        { id: 8, title: 'Archive this list', onClick: onArchiveGroup },
    ]

    return (
        <div className="group-preview-menu">
            <ul>
                {items.map((item) =>
                    item.hr ? (
                        <hr key={item.id} />
                    ) : (
                        <li
                            key={item.id}
                            className="group-menu-clickable-item"
                            onClick={item.onClick}
                        >
                            {item.title}
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}
