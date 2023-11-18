import { getMaterialSymbol } from '../util'

export function Icon({ type, size = 'sm', className, onClick }) {
    return (
        <span
            className={`icon ${size} material-symbols-outlined${
                className ? ` ${className}` : ''
            }`}
            onClick={onClick}
        >
            {getMaterialSymbol(type)}
        </span>
    )
}
