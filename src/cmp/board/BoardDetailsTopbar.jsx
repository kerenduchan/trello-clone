import { updateBoard } from '../../store/actions/board.actions'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { EditableTitle } from '../general/EditableTitle'

export function BoardDetailsTopbar({ board }) {
    function onStarClick() {
        updateBoard({ ...board, isStarred: !board.isStarred })
    }

    function onTitleChange(title) {
        board.title = title
        updateBoard({ ...board, title })
    }

    return (
        <div className="board-details-topbar">
            <EditableTitle onChange={onTitleChange} title={board.title} />
            <SquareIconBtn
                icon="star"
                full={board.isStarred}
                onClick={onStarClick}
            />
        </div>
    )
}
