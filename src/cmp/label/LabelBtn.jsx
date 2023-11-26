export function LabelBtn({ label, onClick }) {
    return (
        <div className="label-btn-container">
            <button
                className="label-btn"
                onClick={onClick}
                style={{ backgroundColor: label.color }}
            >
                {label.title}
            </button>
            <div className="overlay" />
        </div>
    )
}
