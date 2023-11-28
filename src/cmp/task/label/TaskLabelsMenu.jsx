import { useState } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { TaskLabelsMenuEdit } from './TaskLabelsMenuEdit'
import { TaskLabelsMenuMain } from './TaskLabelsMenuMain'

export function TaskLabelsMenu({ board, group, task, labelsMenu }) {
    // current page in the labels menu popover: main or edit
    const [page, setPage] = useState('main')
    const [labelToEdit, setLabelToEdit] = useState(null)

    function onEditClick(label) {
        setLabelToEdit(label)
        setPage('edit')
    }

    function onBackClick() {
        setPage('main')
    }

    const contents = {
        main: (
            <PopoverMenu title="Labels" {...labelsMenu.popover}>
                <TaskLabelsMenuMain
                    board={board}
                    group={group}
                    task={task}
                    onClose={labelsMenu.onClose}
                    onEditClick={onEditClick}
                />
            </PopoverMenu>
        ),
        edit: (
            <PopoverMenu
                title="Edit Label"
                {...labelsMenu.popover}
                onBack={onBackClick}
            >
                <TaskLabelsMenuEdit
                    board={board}
                    group={group}
                    task={task}
                    label={labelToEdit}
                    onClose={labelsMenu.onClose}
                    onBack={onBackClick}
                />
            </PopoverMenu>
        ),
    }

    return contents[page]
}
