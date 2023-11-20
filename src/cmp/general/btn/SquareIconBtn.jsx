import { Icon } from '../Icon'

export function SquareIconBtn({ icon, className, onClick }) {
    return (
        <button
            className={`square-icon-btn${className ? ` ${className}` : ''}`}
            onClick={onClick}
        >
            <Icon type={icon}></Icon>
        </button>
    )
}
