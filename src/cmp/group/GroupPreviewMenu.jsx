import { hideModal } from '../../store/actions/app.actions'
import { updateBoard } from '../../store/actions/board.actions'

export function GroupPreviewMenu({ board, group }) {
    function onDeleteClick() {
        updateBoard({
            ...board,
            groups: board.groups.filter((g) => g._id !== group._id),
        })
        hideModal()
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
