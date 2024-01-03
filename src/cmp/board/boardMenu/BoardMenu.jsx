import { useEffect, useState } from 'react'
import { Icon } from '../../general/Icon'
import { BoardMenuMain } from './BoardMenuMain'
import { BoardMenuArchive } from './BoardMenuArchive'

export function BoardMenu({ board, onClose }) {
    // current page in the group menu popover
    const [page, setPage] = useState('main')
    const [title, setTitle] = useState('Menu')

    useEffect(() => {
        setTitle(contents[page].title)
    }, [page])

    function onNavToMain() {
        setPage('main')
    }

    const contents = {
        main: {
            title: 'Menu',
            cmp: (
                <BoardMenuMain
                    onArchive={() => {
                        setPage('archive')
                    }}
                />
            ),
        },
        archive: {
            title: 'Archive',
            cmp: <BoardMenuArchive board={board} />,
            onBack: onNavToMain,
        },
    }

    return (
        <div className="board-menu">
            <header>
                {contents[page].onBack && (
                    <button
                        className="btn-square btn-back"
                        onClick={contents[page].onBack}
                    >
                        <Icon type="back" size="xs" />
                    </button>
                )}
                <div className="title">{title}</div>
                <button className="btn-square btn-close" onClick={onClose}>
                    <Icon type="close" />
                </button>
                <hr className="divider" />
            </header>

            <div className="content">{contents[page].cmp}</div>
        </div>
    )
}
