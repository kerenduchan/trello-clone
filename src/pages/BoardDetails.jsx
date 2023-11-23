import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { loadBoard, unloadBoard } from '../store/actions/board.actions'
import { useToggle } from '../customHooks/useToggle'
import { GroupList } from '../cmp/group/GroupList'
import { BoardDetailsTopbar } from '../cmp/board/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'
import { BoardDetailsMenu } from '../cmp/board/BoardDetailsMenu'
import { SquareIconBtn } from '../cmp/general/btn/SquareIconBtn'
import { GroupCreate } from '../cmp/group/GroupCreate'

export function BoardDetails() {
    const params = useParams()
    const board = useSelector((storeState) => storeState.boardModule.curBoard)
    const [showMenu, toggleShowMenu, setShowMenu] = useToggle()

    useEffect(() => {
        loadBoard(params.boardId)

        return () => unloadBoard()
    }, [params.boardId])

    function findGroupAndTask(taskId) {
        for (let i = 0; i < board.groups.length; i++) {
            const group = board.groups[i]
            for (let j = 0; j < group.tasks.length; ++j) {
                const task = group.tasks[j]
                if (task._id === taskId) {
                    return { group, task }
                }
            }
        }
        return null
    }

    if (!board) return <div>Loading..</div>

    const groupAndTask = params.taskId ? findGroupAndTask(params.taskId) : null

    return (
        <div
            className="board-details"
            style={{
                backgroundImage: `url(${board.style?.backgroundImage})`,
            }}
        >
            <header>
                <BoardDetailsTopbar board={board} />
                <SquareIconBtn icon="more" onClick={toggleShowMenu} />
            </header>
            {showMenu && (
                <BoardDetailsMenu
                    board={board}
                    onClose={() => setShowMenu(false)}
                />
            )}
            <section className="board-canvas">
                <GroupList board={board} groups={board.groups} />
                <GroupCreate board={board} />
            </section>

            {params.taskId && (
                <TaskDetails
                    board={board}
                    group={groupAndTask.group}
                    task={groupAndTask.task}
                />
            )}
        </div>
    )
}
