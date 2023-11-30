import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { loadBoard, unloadBoard } from '../store/actions/board.actions'
import { useEffectUpdate } from '../customHooks/useEffectUpdate'
import { useToggle } from '../customHooks/useToggle'
import { GroupList } from '../cmp/group/GroupList'
import { BoardDetailsTopbar } from '../cmp/board/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'
import { BoardDetailsMenu } from '../cmp/board/BoardDetailsMenu'
import { SquareIconBtn } from '../cmp/general/btn/SquareIconBtn'
import { GroupCreate } from '../cmp/group/GroupCreate'
import { boardService } from '../services/board.service'

export function BoardDetails() {
    const params = useParams()
    const board = useSelector((storeState) => storeState.boardModule.curBoard)
    const [showMenu, toggleShowMenu, setShowMenu] = useToggle()

    useEffectUpdate(() => {
        loadBoard(params.boardId)

        return () => {
            unloadBoard()
        }
    }, [params.boardId])

    if (!board) return <div>Loading..</div>

    const groupAndTask = params.taskId
        ? boardService.getGroupAndTaskByTaskId(board, params.taskId)
        : null

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
                    hierarchy={{
                        board,
                        ...groupAndTask,
                    }}
                />
            )}
        </div>
    )
}
