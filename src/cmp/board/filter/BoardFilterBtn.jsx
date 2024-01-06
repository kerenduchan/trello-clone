import { Icon } from '../../general/Icon'

export function BoardFilterBtn({ isFilterEmpty, filterMenu, onClearFilter }) {
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
