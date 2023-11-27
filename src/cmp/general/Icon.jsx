import { getMaterialSymbol } from '../../util'

export function Icon({ type, size = 'sm', full = false, className, onClick }) {
    return (
        <span
            className={`icon ${type}-icon ${size} material-symbols-outlined ${full ? 'full' : ''} ${className}`}
            onClick={onClick}
        >
            {getMaterialSymbol(type)}
        </span>
    )
}
