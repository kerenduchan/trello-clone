import { updateBoard } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { Icon } from '../general/Icon'

export function BoardDetailsTopbar({ board }) {
    function onStarClick() {
        updateBoard(board, { isStarred: !board.isStarred })
    }

    function onTitleChange(title) {
        try {
            updateBoard(board, { title })
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div className="board-details-topbar">
            <EditableTitle onChange={onTitleChange} title={board.title} />
            <button className="btn-square btn-star" onClick={onStarClick}>
                <Icon type="star" full={board.isStarred} />
            </button>
        </div>
    )
}
