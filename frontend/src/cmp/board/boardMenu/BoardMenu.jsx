import { useEffect, useState } from 'react'
import { Icon } from '../../general/Icon'
import { BoardMenuMain } from './BoardMenuMain'
import { BoardMenuArchive } from './BoardMenuArchive'
import { BoardMenuBackgroundMain } from './BoardMenuBackgroundMain'
import { BoardMenuBackgroundColor } from './BoardMenuBackgroundColor'
import { BoardMenuBackgroundPhoto } from './BoardMenuBackgroundPhoto'
import { BoardMenuActivity } from './BoardMenuActivity'

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
                    board={board}
                    onActivity={() => {
                        setPage('activity')
                    }}
                    onArchive={() => {
                        setPage('archive')
                    }}
                    onChangeBackground={() => {
                        setPage('backgroundMain')
                    }}
                />
            ),
        },
        activity: {
            title: 'Activity',
            cmp: <BoardMenuActivity board={board} />,
            onBack: onNavToMain,
        },
        archive: {
            title: 'Archive',
            cmp: <BoardMenuArchive board={board} />,
            onBack: onNavToMain,
        },
        backgroundMain: {
            title: 'Change background',
            cmp: (
                <BoardMenuBackgroundMain
                    board={board}
                    onPhotosClick={() => {
                        setPage('backgroundPhoto')
                    }}
                    onColorsClick={() => {
                        setPage('backgroundColor')
                    }}
                />
            ),
            onBack: onNavToMain,
        },

        backgroundPhoto: {
            title: (
                <div className="bg-photo-title">
                    Photos by{' '}
                    <a
                        className="link"
                        href="https://unsplash.com/"
                        target="_blank"
                    >
                        Unsplash
                    </a>
                </div>
            ),
            cmp: <BoardMenuBackgroundPhoto board={board} />,
            onBack: () => {
                setPage('backgroundMain')
            },
        },

        backgroundColor: {
            title: 'Colors',
            cmp: <BoardMenuBackgroundColor />,
            onBack: () => {
                setPage('backgroundMain')
            },
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
