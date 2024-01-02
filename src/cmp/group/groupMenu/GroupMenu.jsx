import { useState, useEffect } from 'react'
import {
    archiveTasks,
    moveTasks,
    updateGroup,
} from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { GroupMenuMain } from './GroupMenuMain'
import { GroupMenuArchiveTasks } from './GroupMenuArchiveTasks'
import { GroupMenuCopyGroup } from './GroupMenuCopyGroup'
import { GroupMenuMoveTasks } from './GroupMenuMoveTasks'
import { GroupMenuMoveGroup } from './GroupMenuMoveGroup'

export function GroupMenu({
    board,
    group,
    popoverState,
    onTaskCreate,
    onClose,
}) {
    // current page in the group menu popover: main/archive
    const [page, setPage] = useState('main')
    const [title, setTitle] = useState('Group actions')

    useEffect(() => {
        setTitle(contents[page].title)
    }, [page])

    function onNavToMain() {
        setPage('main')
    }

    function onTaskCreateInternal() {
        onTaskCreate(0)
        onClose()
    }

    function onCopyGroup() {
        console.log('copy group')
        onClose()
    }

    function onMoveGroup() {
        console.log('move group')
        onClose()
    }

    function onMoveTasks(targetGroupId) {
        moveTasks(board, group, targetGroupId)
        onClose()
    }

    function onArchiveTasks() {
        archiveTasks(board, group)
        onClose()
    }

    function onArchiveGroup() {
        updateGroup(board, group, { archivedAt: Date.now() })
        onClose()
    }

    const contents = {
        main: {
            title: 'Group actions',
            cmp: (
                <GroupMenuMain
                    onTaskCreate={onTaskCreateInternal}
                    onCopyGroup={() => setPage('copyGroup')}
                    onMoveGroup={() => setPage('moveGroup')}
                    onMoveTasks={() => setPage('moveTasks')}
                    onArchiveTasks={() => setPage('archiveTasks')}
                    onArchiveGroup={onArchiveGroup}
                />
            ),
        },

        copyGroup: {
            title: 'Copy list',
            cmp: <GroupMenuCopyGroup onCopyGroup={onCopyGroup} />,
            back: onNavToMain,
        },

        moveGroup: {
            title: 'Move list',
            cmp: (
                <GroupMenuMoveGroup
                    board={board}
                    group={group}
                    onMoveGroup={onMoveGroup}
                />
            ),
            back: onNavToMain,
        },

        moveTasks: {
            title: 'Move all cards in list',
            cmp: (
                <GroupMenuMoveTasks
                    board={board}
                    group={group}
                    onMoveTasks={onMoveTasks}
                />
            ),
            back: onNavToMain,
        },

        archiveTasks: {
            title: 'Archive all cards in this list?',
            cmp: <GroupMenuArchiveTasks onArchiveTasks={onArchiveTasks} />,
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
