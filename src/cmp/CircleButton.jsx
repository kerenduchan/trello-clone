export function CircleButton({ type, onClick }) {
    return (
        <button
            className={`circle-btn ${type}-btn material-symbols-outlined`}
            onClick={onClick}
        >
            {type}
        </button>
    )
}