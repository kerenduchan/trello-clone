import { useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { boardService } from '../../../services/board.service'
import { Icon } from '../../general/Icon'
import { BoardFilterMenu } from './BoardFilterMenu'

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
        <div
            className={`board-filter ${
                isFilterEmpty ? '' : 'show-btn-clear-all'
            }`}
        >
            <button
                className={`btn-filter btn-dynamic ${
                    filterMenu.show || !isFilterEmpty ? 'highlighted' : ''
                }`}
                {...filterMenu.triggerAndTarget}
            >
                <Icon type="filter" size="xs" />
                <span className="label">Filters</span>
            </button>
            <button
                className="btn-dynamic highlighted btn-filter-clear-all"
                onClick={onClearFilter}
            >
                Clear all
            </button>

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
