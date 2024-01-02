export function GroupMenuMoveGroup({ onMoveGroup }) {
    return (
        <div className="group-menu-move-group">
            <button className="btn-primary" onClick={onMoveGroup}>
                Move
            </button>
        </div>
    )
}
