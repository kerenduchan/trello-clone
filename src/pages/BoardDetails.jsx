import { useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
    loadBoard,
    unloadBoard,
    moveTask,
    moveGroup,
    moveChecklist,
} from '../store/actions/board.actions'
import { useToggle } from '../customHooks/useToggle'
import { GroupList } from '../cmp/group/GroupList'
import { BoardDetailsTopbar } from '../cmp/board/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'
import { BoardMenu } from '../cmp/board/boardMenu/BoardMenu'
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

    function onDragEnd(result) {
        const { destination, source, draggableId, type } = result

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return
        }

        if (type === 'task') {
            // drag-drop task
            const sourceGroup = board.groups.find(
                (g) => g._id === source.droppableId
            )
            const targetGroupId = destination.droppableId
            const task = sourceGroup.tasks.find((t) => t._id === draggableId)
            const hierarchy = { board, group: sourceGroup, task }

            moveTask(hierarchy, board._id, targetGroupId, destination.index)
        } else if (type === 'group') {
            // drag-drop group
            const group = board.groups.find((g) => g._id === draggableId)

            moveGroup(board, group, board._id, destination.index)
        } else if (type === 'checklist') {
            // drag-drop checklist
            const { group, task } = boardService.getGroupAndTaskByTaskId(
                board,
                source.droppableId
            )

            const hierarchy = { board, group, task }

            moveChecklist(hierarchy, draggableId, destination.index)
        }
    }

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
                        <BoardMenu
                            board={board}
                            onClose={() => setShowMenu(false)}
                        />
                    )}
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable
                            droppableId={board._id}
                            direction="horizontal"
                            type="group"
                        >
                            {(provided) => (
                                <section
                                    className="board-canvas"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <GroupList
                                        board={board}
                                        groups={board.groups.filter(
                                            (g) => !g.archivedAt
                                        )}
                                    />
                                    <GroupCreate board={board} />
                                    {provided.placeholder}
                                </section>
                            )}
                        </Droppable>

                        {params.taskId && (
                            <TaskDetails
                                hierarchy={{
                                    board,
                                    ...groupAndTask,
                                }}
                            />
                        )}
                    </DragDropContext>
                </>
            ) : (
                <div>Loading..</div>
            )}
        </div>
    )
}
