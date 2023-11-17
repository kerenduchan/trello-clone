import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { loadBoards } from '../store/actions/board.actions'

import { BoardIndexHeader } from '../cmp/BoardIndexHeader'
import { BoardList } from '../cmp/BoardList'

export function BoardIndex() {
    const params = useParams()
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards) return <div>Loading..</div>

    return (
        <div className="board-index">
            <BoardIndexHeader />
            <h1>{params.userId}'s Boards</h1>
            <BoardList boards={boards} />
        </div>
    )
}
