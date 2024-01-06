import { updateBoard } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { Icon } from '../general/Icon'
import { BoardFilter } from './filter/BoardFilter'

export function BoardDetailsTopbar({ board, onFilterChange }) {
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
            <div className="start-container">
                {/* Title */}
                <EditableTitle onChange={onTitleChange} title={board.title} />

                {/* Star */}
                <button className="btn-square btn-star" onClick={onStarClick}>
                    <Icon type="star" full={board.isStarred} />
                </button>
            </div>

            <div className="end-container">
                {/* Filter */}
                <BoardFilter onFilterChange={onFilterChange} />

                {/* Divider */}
                <span className="separator" />
            </div>
        </div>
    )
}
