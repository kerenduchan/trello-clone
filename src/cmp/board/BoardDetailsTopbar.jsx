import { updateBoard } from '../../store/actions/board.actions'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { EditableTitle } from '../general/EditableTitle'

export function BoardDetailsTopbar({ board }) {
    function onStarClick() {
        // star / unstar the board
        const boardClone = structuredClone(board)
        boardClone.isStarred = !boardClone.isStarred
        updateBoard(boardClone)
    }

    function onTitleChange(title) {
        // change the board's title
        const boardClone = structuredClone(board)
        boardClone.title = title
        updateBoard(boardClone)
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
