import { Icon } from './Icon'

export function SecondaryBtn({ icon, text, className, onClick }) {
    return (
        <button
            className={`secondary-btn ${className ? ` ${className}` : ''}`}
            onClick={onClick}
        >
            {icon && <Icon type={icon} size="sm"></Icon>}
            <span>{text}</span>
        </button>
    )
}
