import { updateBoard } from '../../store/actions/board.actions'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { EditableTitle } from '../general/EditableTitle'
import { Icon } from '../general/Icon'
import { BoardFilterMenu } from './filter/BoardFilterMenu'

export function BoardDetailsTopbar({ board, onFilterChange }) {
    const filterMenu = usePopoverState()

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
                <button className="btn-filter" {...filterMenu.triggerAndTarget}>
                    <Icon type="filter" size="xs" />
                    <span className="label">Filters</span>
                </button>

                {/* Divider */}
                <span className="separator" />
            </div>

            {/* Filter menu */}
            {filterMenu.show && (
                <BoardFilterMenu
                    popoverState={filterMenu}
                    onChange={onFilterChange}
                />
            )}
        </div>
    )
}
