import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
    loadBoard,
    unloadBoard,
    applyBoardFilter,
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
import { useSearchParams } from 'react-router-dom'
import { utilService } from '../services/util.service'

export function BoardDetails() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFilterEmpty, setIsFilterEmpty] = useState(true)
    const board = useSelector((storeState) => storeState.boardModule.curBoard)
    const filteredBoard = useSelector(
        (storeState) => storeState.boardModule.filteredBoard
    )
    const [showMenu, toggleShowMenu, setShowMenu] = useToggle()
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        loadBoard(params.boardId)

        return () => {
            unloadBoard()
        }
    }, [params.boardId])

    // search params must be the single source of truth in order for
    // "back" to work
    useEffect(() => {
        setFilter(
            utilService.parseSearchParams(
                searchParams,
                boardService.getDefaultFilter()
            )
        )
    }, [searchParams])

    useEffect(() => {
        applyBoardFilter(filter)
    }, [filter, board])

    const groupAndTask = params.taskId
        ? boardService.getGroupAndTaskByTaskId(board, params.taskId)
        : null

    function onDragEnd(result) {
        boardService.handleDragEnd(result, board)
    }

    function onFilterChange(filter) {
        setIsFilterEmpty(boardService.isFilterEmpty(filter))
        setSearchParams(
            utilService.buildSearchParams(
                filter,
                boardService.getDefaultFilter()
            )
        )
    }

    return (
        <div
            className="board-details"
            style={{
                backgroundImage: `url(${board?.style?.backgroundImage})`,
            }}
        >
            <BoardIndexHeader />

            {filteredBoard ? (
                <>
                    <header className="board-details-header">
                        <BoardDetailsTopbar
                            board={board}
                            onFilterChange={onFilterChange}
                        />

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
                                        groups={filteredBoard.groups}
                                        isFilterEmpty={isFilterEmpty}
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
