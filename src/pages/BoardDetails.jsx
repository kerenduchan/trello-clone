import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadBoards } from '../store/actions/board.actions'

export function BoardDetails() {
    const params = useParams()
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards) return <div>Loading..</div>

    function getBoard() {
        const found = boards.filter((b) => b._id === params.boardId)
        return found && found.length === 1 ? found[0] : null
    }

    return (
        <div className="board-details">
            <h1>{getBoard()?.title}</h1>
        </div>
    )
}
