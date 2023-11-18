export function SecondaryBtn({ className, onClick, children }) {
    return (
        <button
            className={'secondary-btn' + (className ? ` ${className}` : '')}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
