import { deleteGroup } from '../../store/actions/board.actions'

export function GroupPreviewMenu({ board, group, onClose }) {
    function onDeleteClick() {
        try {
            deleteGroup(board, group)
            onClose()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div className="group-preview-menu">
            <ul>
                <li className="group-preview-menu-item" onClick={onDeleteClick}>
                    Delete this list
                </li>
            </ul>
        </div>
    )
}
