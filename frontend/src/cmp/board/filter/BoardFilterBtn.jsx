import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectFilteredBoard } from '../../../store/reducers/board.reducer'
import { boardService } from '../../../services/board/board.service'
import { Icon } from '../../general/Icon'

export function BoardFilterBtn({ isFilterEmpty, filterMenu, onClearFilter }) {
    const [matchedCount, setMatchedCount] = useState(null)
    const filteredBoard = useSelector(selectFilteredBoard)

    useEffect(() => {
        setMatchedCount(boardService.getTasksCount(filteredBoard))
    }, [filteredBoard])

    return (
        <div
            className={`board-filter-btn ${
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
                {!isFilterEmpty && (
                    <span className="matched-count">{matchedCount}</span>
                )}
            </button>
            <button
                className="btn-dynamic highlighted btn-filter-clear-all"
                onClick={onClearFilter}
            >
                Clear all
            </button>
        </div>
    )
}
