import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { loadBoard } from '../store/actions/board.actions'
import { GroupList } from '../cmp/group/GroupList'
import { BoardDetailsTopbar } from '../cmp/board/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'

export function BoardDetails() {
    const params = useParams()
    const board = useSelector((storeState) => storeState.boardModule.curBoard)

    useEffect(() => {
        loadBoard(params.boardId)
    }, [params.boardId])

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
                backgroundImage: `url(${board.style?.backgroundImage})`,
            }}
        >
            <BoardDetailsTopbar board={board} />

            <section className="board-canvas">
                <GroupList board={board} groups={board.groups} />
            </section>

            {params.taskId && (
                <TaskDetails board={board} task={findTaskById(params.taskId)} />
            )}
        </div>
    )
}
