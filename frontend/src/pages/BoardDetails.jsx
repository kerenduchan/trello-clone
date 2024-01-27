import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import {
    selectBoard,
    selectFilteredBoard,
} from '../store/reducers/board.reducer'
import {
    loadBoard,
    loadBoards,
    unloadBoard,
} from '../store/actions/board/board.actions'
import { applyBoardFilter } from '../store/actions/board/board.filter.actions'
import { boardService } from '../services/board/board.service'
import { useToggle } from '../customHooks/useToggle'
import { useDocumentTitle } from '../customHooks/useDocumentTitle'
import { GroupList } from '../cmp/group/GroupList'
import { BoardDetailsTopbar } from '../cmp/board/BoardDetailsTopbar'
import { TaskDetails } from './TaskDetails'
import { BoardMenu } from '../cmp/board/boardMenu/BoardMenu'
import { GroupCreate } from '../cmp/group/GroupCreate'
import { Icon } from '../cmp/general/Icon'
import { BoardIndexHeader } from '../cmp/board/BoardIndexHeader'

export function BoardDetails() {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [isFilterEmpty, setIsFilterEmpty] = useState(true)
    const board = useSelector(selectBoard)
    const filteredBoard = useSelector(selectFilteredBoard)
    const [showMenu, toggleShowMenu, setShowMenu] = useToggle()
    const [filter, setFilter] = useState(null)

    useDocumentTitle(board && board.title + ' | Krello', board)

    useEffect(() => {
        // load all boards in case page was refreshed and tasks will be dragged/dropped
        loadBoards()
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

    return (
        <div
            className={`board-details board-theme-${boardService.getBoardTheme(
                board
            )}`}
            style={boardService.getBoardStyle(board)}
        >
            <BoardIndexHeader board={board} />

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
                                className="btn-square-sharp btn-more"
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
                        <div className="board-canvas-container">
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

                                        {provided.placeholder}
                                    </section>
                                )}
                            </Droppable>
                            <GroupCreate board={board} />
                        </div>

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
                <div className="loading">Loading..</div>
            )}
        </div>
    )
}
