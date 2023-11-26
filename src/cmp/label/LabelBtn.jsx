export function LabelBtn({ label, size = 'lg', onClick }) {
    return (
        <div className={`label-btn-container ${size}`}>
            <button
                className={`label-btn ${size}`}
                onClick={onClick}
                style={{ backgroundColor: label.color }}
            >
                <span className="title">{label.title}</span>
            </button>
            <div className="overlay" />
        </div>
    )
}
