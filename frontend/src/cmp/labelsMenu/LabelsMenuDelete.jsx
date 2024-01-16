export function LabelsMenuDelete({ onDelete }) {
    return (
        <div className="labels-menu-delete">
            <p className="text">
                This will remove this label from all cards. There is no undo.
            </p>
            <button className="btn-danger" onClick={onDelete}>
                Delete
            </button>
        </div>
    )
}
