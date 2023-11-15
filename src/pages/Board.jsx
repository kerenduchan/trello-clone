import { useParams } from 'react-router'
import { getBoard } from '../util'

export function Board() {
    const params = useParams()

    return (
        <div id="board-page">
            <h1>{getBoard(params.boardId).name}</h1>
        </div>
    )
}
