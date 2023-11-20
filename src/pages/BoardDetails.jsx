import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service'
import { Group } from '../cmp/Group'
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
        for (let i = 0; i < board.groups.length; i++) {
            const group = board.groups[i]
            for (let j = 0; j < group.tasks.length; ++j) {
                const task = group.tasks[j]
                if (task._id === taskId) {
                    // add more data onto the task that's needed for rendering the task
                    return {
                        ...task,
                        group: {
                            _id: group._id,
                            title: group.title,
                        },
                        labels: task.labelIds
                            ? task.labelIds.map((labelId) => {
                                  return board.labels.filter(
                                      (l) => l._id === labelId
                                  )[0]
                              })
                            : [],
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
                <ol className="group-list">
                    {board.groups.map((g) => (
                        <li key={g._id}>
                            <Group board={board} group={g} />
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
