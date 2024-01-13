import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllBoards } from '../store/reducers/board.reducer'
import { loadBoards } from '../store/actions/board.actions'
import { BoardList } from '../cmp/board/BoardList'
import { Icon } from '../cmp/general/Icon'
import { BoardIndexHeader } from '../cmp/board/BoardIndexHeader'

export function BoardIndex() {
    const boards = useSelector(selectAllBoards)
    const [starredBoards, setStarredBoards] = useState([])

    useEffect(() => {
        loadBoards()
    }, [])

    useEffect(() => {
        setStarredBoards(boards.filter((b) => b.isStarred === true))
    }, [boards])

    if (!boards) return <div>Loading..</div>

    return (
        <div className="board-index">
            <BoardIndexHeader />

            <div className="boards-sections">
                {/* Starred boards */}
                {!!starredBoards?.length && (
                    <div className="boards-section">
                        <header className="header">
                            <Icon type="star" size="lg"></Icon>
                            <h1 className="title">Starred Boards</h1>
                        </header>
                        <BoardList boards={starredBoards} />
                    </div>
                )}

                {/* All boards */}
                <div className="your-boards-section">
                    <h1 className="title">Your boards</h1>
                    <BoardList boards={boards} />
                </div>
            </div>
        </div>
    )
}
