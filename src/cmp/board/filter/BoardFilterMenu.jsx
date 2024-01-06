import { PopoverMenu } from '../../general/PopoverMenu'

export function BoardFilterMenu({ popoverState, filter, onChange }) {
    return (
        <PopoverMenu
            className="board-filter-menu"
            title="Filter"
            {...popoverState.popover}
        >
            <h4>Keyword</h4>
            <input
                type="text"
                name="txt"
                placeholder="Enter a keyword..."
                onChange={onChange}
                value={filter.txt}
            ></input>
            <p className="note">Search cards, members, labels, and more.</p>
            <h4>Members</h4>
            <h4>Due date</h4>
            <h4>Labels</h4>
        </PopoverMenu>
    )
}
