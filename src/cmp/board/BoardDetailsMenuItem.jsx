import { Icon } from '../general/Icon'

export function BoardDetailsMenuItem({ icon, title, onClick }) {
    return (
        <div className="board-details-menu-item" onClick={onClick}>
            <Icon type={icon} />
            <span className="title">{title}</span>
        </div>
    )
}
