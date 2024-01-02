import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { loadBoard, unloadBoard } from '../store/actions/board.actions'
import { useToggle } from '../customHooks/useToggle'
import { GroupList } from '../cmp/group/GroupList'
import { BoardDetailsTopbar } from '../cmp/board/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'
import { BoardDetailsMenu } from '../cmp/board/BoardDetailsMenu'
import { GroupCreate } from '../cmp/group/GroupCreate'
import { boardService } from '../services/board.service'
import { Icon } from '../cmp/general/Icon'
import { BoardIndexHeader } from '../cmp/board/BoardIndexHeader'

export function BoardDetails() {
    const params = useParams()
    const board = useSelector((storeState) => storeState.boardModule.curBoard)
    const [showMenu, toggleShowMenu, setShowMenu] = useToggle()

    useEffect(() => {
        loadBoard(params.boardId)

        return () => {
            unloadBoard()
        }
    }, [params.boardId])

    const groupAndTask = params.taskId
        ? boardService.getGroupAndTaskByTaskId(board, params.taskId)
        : null

    return (
        <div
            className="board-details"
            style={{
                backgroundImage: `url(${board?.style?.backgroundImage})`,
            }}
        >
            <BoardIndexHeader />

            {board ? (
                <>
                    <header className="board-details-header">
                        <BoardDetailsTopbar board={board} />

                        <button
                            className="btn-square btn-more"
                            onClick={toggleShowMenu}
                        >
                            <Icon type="more" />
                        </button>
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
                </>
            ) : (
                <div>Loading..</div>
            )}
        </div>
    )
}
