export function CircleButton({ type }) {
    return (
        <button className={`circle-btn ${type}-btn material-symbols-outlined`}>
            {type}
        </button>
    )
}
