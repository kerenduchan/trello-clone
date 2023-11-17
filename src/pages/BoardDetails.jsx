import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { TaskGroup } from '../cmp/TaskGroup'
import { BoardDetailsTopbar } from '../cmp/BoardDetailsTopbar'

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
            <BoardDetailsTopbar board={board} />

            <section className="board-canvas">
                <ol className="task-group-list">
                    {board.taskGroups.map((g) => (
                        <li key={g._id}>
                            <TaskGroup taskGroup={g} />
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    )
}
