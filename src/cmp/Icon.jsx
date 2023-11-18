import { getMaterialSymbol } from '../util'

export function Icon({ type, size = 'sm' }) {
    return (
        <span className={`icon ${size} material-symbols-outlined`}>
            {getMaterialSymbol(type)}
        </span>
    )
}
