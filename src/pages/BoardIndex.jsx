import { useParams } from 'react-router'
import { getBoards } from '../util'
import { BoardList } from '../cmp/BoardList'

export function BoardIndex() {
    const params = useParams()

    return (
        <div className="board-index">
            <h1>{params.userId}'s Boards</h1>
            <BoardList boards={getBoards()} />
        </div>
    )
}
