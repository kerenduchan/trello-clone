import { useParams } from 'react-router'
import { getBoards } from '../util'
import { BoardList } from '../cmp/BoardList'
import { useSelector } from 'react-redux'

import { loadBoards } from '../store/actions/board.actions'
import { useEffect } from 'react'

export function BoardIndex() {
    const params = useParams()
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards) return <div>Loading..</div>

    return (
        <div className="board-index">
            <h1>{params.userId}'s Boards</h1>
            <BoardList boards={boards} />
        </div>
    )
}
