import { useParams } from 'react-router'
import { getBoard } from '../util'

export function BoardDetails() {
    const params = useParams()

    return (
        <div className="board-details">
            <h1>{getBoard(params.boardId).name}</h1>
        </div>
    )
}
