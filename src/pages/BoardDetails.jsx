import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { TaskGroup } from '../cmp/TaskGroup'
import { BoardDetailsTopbar } from '../cmp/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'

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

    function findTaskById(taskId) {
        for (let i = 0; i < board.taskGroups.length; i++) {
            const taskGroup = board.taskGroups[i]
            for (let j = 0; j < taskGroup.tasks.length; ++j) {
                const task = taskGroup.tasks[j]
                if (task._id === taskId) {
                    return {
                        ...task,
                        taskGroup: {
                            _id: taskGroup._id,
                            title: taskGroup.title,
                        },
                    }
                }
            }
        }
        return null
    }

    if (!board) return <div>Loading..</div>

    return (
        <div
            className="board-details"
            style={{
                backgroundImage: `url(${board.style.backgroundImage})`,
            }}
        >
            <BoardDetailsTopbar board={board} />

            <section className="board-canvas">
                <ol className="task-group-list">
                    {board.taskGroups.map((g) => (
                        <li key={g._id}>
                            <TaskGroup board={board} taskGroup={g} />
                        </li>
                    ))}
                </ol>
            </section>

            {params.taskId && (
                <TaskDetails board={board} task={findTaskById(params.taskId)} />
            )}
        </div>
    )
}
