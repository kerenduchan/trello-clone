import { Icon } from '../Icon'

export function SquareIconBtn({ icon, full = false, className, onClick }) {
    return (
        <button
            className={`square-icon-btn ${icon}-btn${
                className ? ` ${className}` : ''
            }`}
            onClick={onClick}
        >
            <Icon type={icon} full={full}></Icon>
        </button>
    )
}
