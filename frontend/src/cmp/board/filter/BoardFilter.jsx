import { usePopoverState } from '../../../customHooks/usePopoverState'
import { boardService } from '../../../services/board.service'
import { BoardFilterMenu } from './BoardFilterMenu'
import { BoardFilterBtn } from './BoardFilterBtn'

export function BoardFilter({ filter, isFilterEmpty, onFilterChange }) {
    const filterMenu = usePopoverState()

    function onClearFilter() {
        onFilterChange(boardService.getDefaultFilter())
    }

    return (
        <div className="board-filter">
            {/* Filter button */}
            <BoardFilterBtn
                filterMenu={filterMenu}
                isFilterEmpty={isFilterEmpty}
                onClearFilter={onClearFilter}
            />

            {/* Filter menu */}
            {filterMenu.show && (
                <BoardFilterMenu
                    popoverState={filterMenu}
                    filter={filter}
                    onChange={onFilterChange}
                />
            )}
        </div>
    )
}
