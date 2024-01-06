import { useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { boardService } from '../../../services/board.service'
import { BoardFilterMenu } from './BoardFilterMenu'
import { BoardFilterBtn } from './BoardFilterBtn'

export function BoardFilter({ onFilterChange }) {
    const [filter, handleChange, setFilter] = useForm({ txt: '' }, onChange)
    const [isFilterEmpty, setIsFilterEmpty] = useState(true)
    const filterMenu = usePopoverState()

    function onChange(filter) {
        setIsFilterEmpty(boardService.isFilterEmpty(filter))
        onFilterChange(filter)
    }

    function onClearFilter() {
        setFilter(boardService.getDefaultFilter())
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
                    onChange={handleChange}
                />
            )}
        </div>
    )
}
