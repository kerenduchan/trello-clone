import { updateBoard } from '../../store/actions/board.actions'
import { EditableTitle } from '../general/EditableTitle'
import { Icon } from '../general/Icon'
import { BoardMembers } from './BoardMembers'
import { BoardFilter } from './filter/BoardFilter'

export function BoardDetailsTopbar({
    board,
    filter,
    isFilterEmpty,
    onFilterChange,
}) {
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
                <EditableTitle
                    className="title"
                    onChange={onTitleChange}
                    title={board.title}
                />

                {/* Star */}
                <button
                    className="btn-square-sharp btn-star"
                    onClick={onStarClick}
                >
                    <Icon type="star" full={board.isStarred} />
                </button>
            </div>

            <div className="end-container">
                {/* Filter */}
                <BoardFilter
                    onFilterChange={onFilterChange}
                    isFilterEmpty={isFilterEmpty}
                    filter={filter}
                />

                {/* Divider */}
                <span className="separator" />

                {/* Members */}
                <BoardMembers members={board.members} />
            </div>
        </div>
    )
}
