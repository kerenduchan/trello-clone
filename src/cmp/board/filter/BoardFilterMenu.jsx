import { PopoverMenu } from '../../general/PopoverMenu'
import { BoardFilterDate } from './BoardFilterDate'

export function BoardFilterMenu({ popoverState, filter, onChange }) {
    function onFilterFieldsChange(fields) {
        onChange({ ...filter, ...fields })
    }

    function onTxtChange(e) {
        onFilterFieldsChange({ txt: e.target.value })
    }

    if (!filter) return <></>

    return (
        <PopoverMenu
            className="board-filter-menu"
            title="Filter"
            {...popoverState.popover}
        >
            <h4>Keyword</h4>
            <input
                className="txt"
                type="text"
                name="txt"
                autoFocus
                placeholder="Enter a keyword..."
                onChange={onTxtChange}
                value={filter.txt}
            ></input>
            <p className="note">Search cards, members, labels, and more.</p>
            <h4>Members</h4>
            <h4>Due date</h4>
            <h4>Labels</h4>
            <BoardFilterDate filter={filter} onChange={onFilterFieldsChange} />
        </PopoverMenu>
    )
}
