import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { TaskGroup } from '../cmp/TaskGroup'

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
                {board.taskGroups.map((g) => (
                    <li key={g._id}>
                        <TaskGroup taskGroup={g} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
