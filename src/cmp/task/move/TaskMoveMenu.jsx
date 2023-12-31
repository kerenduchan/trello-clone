import { useState } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { CustomSelect } from '../../general/CustomSelect'

export function TaskMoveMenu({ hierarchy, popoverState }) {
    const { board, group, task } = hierarchy

    const [selectedBoard, setSelectedBoard] = useState({
        value: 'option1',
        text: 'Option 1',
    })

    const [selectedGroup, setSelectedGroup] = useState({
        value: 'option1',
        text: 'Option 1',
    })

    const [selectedPosition, setSelectedPosition] = useState({
        value: 'option1',
        text: 'Option 1',
    })

    const options = [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
        { value: 'option4', text: 'Option 4' },
        { value: 'option5', text: 'Option 5' },
        { value: 'option6', text: 'Option 6' },
        { value: 'option7', text: 'Option 7' },
        { value: 'option8', text: 'Option 8' },
        { value: 'option9', text: 'Option 9' },
    ]

    return (
        <PopoverMenu
            className="task-move-menu"
            title="Move card"
            {...popoverState.popover}
        >
            <h4>Select destination</h4>

            <div className="destination">
                <CustomSelect
                    className="board-select"
                    label="Board"
                    options={options}
                    selected={selectedBoard}
                    onSelect={setSelectedBoard}
                />

                <CustomSelect
                    className="group-select"
                    label="List"
                    options={options}
                    selected={selectedGroup}
                    onSelect={setSelectedGroup}
                />

                <CustomSelect
                    className="position-select"
                    label="Position"
                    options={options}
                    selected={selectedPosition}
                    onSelect={setSelectedPosition}
                />
            </div>

            <button className="btn-primary">Move</button>
        </PopoverMenu>
    )
}
