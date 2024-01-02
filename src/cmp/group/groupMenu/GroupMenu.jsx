import { useState, useEffect } from 'react'
import { PopoverMenu } from '../../general/PopoverMenu'
import { GroupMenuMain } from './GroupMenuMain'
import { GroupMenuArchiveAllTasks } from './GroupMenuArchiveAllTasks'

export function GroupMenu({ hierarchy, popoverState, onTaskCreate, onClose }) {
    // current page in the group menu popover: main/archive
    const [page, setPage] = useState('main')
    const [title, setTitle] = useState('Group actions')

    useEffect(() => {
        setTitle(contents[page].title)
    }, [page])

    function onNavToMain() {
        setPage('main')
    }

    function onNavToArchiveAllTasks() {
        setPage('archiveAllTasks')
    }

    function onArchiveAllTasks() {
        console.log('archive all tasks')
        onClose()
    }

    const contents = {
        main: {
            title: 'Group actions',
            cmp: (
                <GroupMenuMain
                    hierarchy={hierarchy}
                    onClose={popoverState.onClose}
                    onTaskCreate={() => onTaskCreate(0)}
                    onArchiveAllTasks={onNavToArchiveAllTasks}
                />
            ),
        },
        archiveAllTasks: {
            title: 'Archive all cards in this list?',
            cmp: (
                <GroupMenuArchiveAllTasks
                    onArchiveAllTasks={onArchiveAllTasks}
                />
            ),
            back: onNavToMain,
        },
    }

    return (
        <PopoverMenu
            title={title}
            {...popoverState.popover}
            onBack={contents[page].back}
        >
            {contents[page].cmp}
        </PopoverMenu>
    )
}
