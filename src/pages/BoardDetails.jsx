import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { BoardGroup } from './BoardGroup'

export function BoardDetails() {
    const [board, setBoard] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    async function loadBoard() {
        try {
            const board = await boardService.getById(params.boardId)
            setBoard(board)
        } catch (err) {
            console.error('Failed to load board:', err)
        }
    }

    if (!board) return <div>Loading..</div>

    return (
        <div className="board-details">
            <h1>{board.title}</h1>
            <ul>
                {board.groups.map((g) => (
                    <li key={g._id}>
                        <BoardGroup group={g} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
