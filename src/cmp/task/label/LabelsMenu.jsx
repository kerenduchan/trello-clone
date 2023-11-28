import { useState } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { LabelsMenuEdit } from './LabelsMenuEdit'
import { LabelsMenuMain } from './LabelsMenuMain'

export function LabelsMenu({ board, group, task, labelsMenu }) {
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
                <LabelsMenuMain
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
                <LabelsMenuEdit
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
