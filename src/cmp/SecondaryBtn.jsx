export function SecondaryBtn({ text, className, onClick }) {
    return (
        <button className={`secondary-btn ${className}`} onClick={onClick}>
            {text}
        </button>
    )
}
