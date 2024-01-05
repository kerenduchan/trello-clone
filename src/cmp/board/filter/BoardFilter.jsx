import { Icon } from '../../general/Icon'

export function BoardFilter() {
    return (
        <div className="board-filter">
            <button className="btn-filter">
                <Icon type="filter" size="xs" />
                <span className="label">Filters</span>
            </button>
        </div>
    )
}
