export function GroupMenuCopyGroup({ onCopyGroup }) {
    return (
        <div className="group-menu-copy-group">
            <h4>Name</h4>
            <textarea />
            <button className="btn-primary" onClick={onCopyGroup}>
                Create list
            </button>
        </div>
    )
}
