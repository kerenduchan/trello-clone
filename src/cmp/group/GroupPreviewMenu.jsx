import { updateBoard } from '../../store/actions/board.actions'
import { deepClone } from '../../util'

export function GroupPreviewMenu({ board, group, onClose }) {
    function onDeleteClick() {
        // delete the group from the board
        const boardClone = deepClone(board)
        boardClone.groups = boardClone.groups.filter((g) => g._id !== group._id)
        updateBoard(boardClone)
        onClose()
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
