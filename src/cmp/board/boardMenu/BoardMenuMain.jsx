import { Icon } from '../../general/Icon'

export function BoardMenuMain({ onArchive }) {
    const items = [
        { id: 1, title: 'Archived Items', icon: 'archive', onClick: onArchive },
    ]

    return (
        <div className="board-menu-main">
            <ul>
                {items.map((item) =>
                    item.hr ? (
                        <hr key={item.id} />
                    ) : (
                        <li key={item.id} onClick={item.onClick}>
                            <Icon type={item.icon} />
                            {item.title}
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}
