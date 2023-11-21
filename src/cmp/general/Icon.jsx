import { buildClassName, getMaterialSymbol } from '../../util'

export function Icon({ type, size = 'sm', className, onClick }) {
    return (
        <span
            className={buildClassName(
                'icon',
                `${type}-icon`,
                size,
                'material-symbols-outlined',
                className
            )}
            onClick={onClick}
        >
            {getMaterialSymbol(type)}
        </span>
    )
}
