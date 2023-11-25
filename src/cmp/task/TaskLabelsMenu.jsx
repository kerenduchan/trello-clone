import { useState } from 'react'
import { PopoverMenu } from '../general/PopoverMenu'
import { TaskLabelsMenuEdit } from './TaskLabelsMenuEdit'
import { TaskLabelsMenuMain } from './TaskLabelsMenuMain'

export function TaskLabelsMenu({ board, group, task, labelsMenu }) {
    // current page in the labels menu popover: main or edit
    const [page, setPage] = useState('main')

    const contents = {
        main: (
            <PopoverMenu title="Labels" {...labelsMenu.popover}>
                <TaskLabelsMenuMain
                    board={board}
                    group={group}
                    task={task}
                    onClose={labelsMenu.onClose}
                    onEditClick={() => setPage('edit')}
                />
            </PopoverMenu>
        ),
        edit: (
            <PopoverMenu title="Edit Label" {...labelsMenu.popover}>
                <TaskLabelsMenuEdit
                    board={board}
                    group={group}
                    task={task}
                    onClose={labelsMenu.onClose}
                    onBackClick={() => setPage('main')}
                />
            </PopoverMenu>
        ),
    }

    return contents[page]
}
