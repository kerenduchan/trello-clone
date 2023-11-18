export function Icon({ type, size }) {
    return (
        <span
            className={
                'material-symbols-outlined' + (size ? ` icon-${size}` : '')
            }
        >
            {type}
        </span>
    )
}
