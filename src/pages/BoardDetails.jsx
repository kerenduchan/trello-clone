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
        const updatedFilter = boardService.parseSearchParams(searchParams)
        setFilter(updatedFilter)
    }, [searchParams])

    useEffect(() => {
        if (!filter || !board) return
        applyBoardFilter(filter)
        setIsFilterEmpty(boardService.isFilterEmpty(filter))
    }, [filter, board])

    const groupAndTask = params.taskId
        ? boardService.getGroupAndTaskByTaskId(board, params.taskId)
        : null

    function onDragEnd(result) {
        boardService.handleDragEnd(result, board, filteredBoard)
    }

    function onFilterChange(filter) {
        const updatedSearchParams = boardService.buildSearchParams(filter)
        setSearchParams(updatedSearchParams)
    }

    function getBoardStyle() {
        if (!board) return

        const { backgroundImage, backgroundColor } = board.style

        if (backgroundImage) {
            return { backgroundImage: `url(${backgroundImage})` }
        } else if (backgroundColor) {
            return { backgroundColor }
        }
        return {}
    }
    return (
        <div className="board-details" style={getBoardStyle()}>
            <BoardIndexHeader />

            {board && filteredBoard ? (
                <>
                    <header
                        className={`board-details-header ${
                            showMenu ? 'menu-open' : ''
                        }`}
                    >
                        <BoardDetailsTopbar
                            board={board}
                            filter={filter}
                            isFilterEmpty={isFilterEmpty}
                            onFilterChange={onFilterChange}
                        />

                        {!showMenu && (
                            <button
                                className="btn-square btn-more"
                                onClick={toggleShowMenu}
                            >
                                <Icon type="more" />
                            </button>
                        )}
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
