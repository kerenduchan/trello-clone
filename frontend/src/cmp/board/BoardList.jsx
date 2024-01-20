import { usePopoverState } from '../../customHooks/usePopoverState'
import { BoardCreate } from './BoardCreate'
import { BoardPreview } from './BoardPreview'

export function BoardList({ boards }) {
    const boardCreateMenu = usePopoverState()

    if (!boards) return <div className="board-list loading">Loading...</div>

    return (
        <ul className="board-list">
            {boards.map((b) => (
                <li key={b._id}>
                    <BoardPreview board={b} />
                </li>
            ))}
            <li key="new">
                <button
                    className="btn-create-board btn-secondary-centered"
                    {...boardCreateMenu.triggerAndTarget}
                >
                    Create new board
                </button>
            </li>

            {boardCreateMenu.show && (
                <BoardCreate popoverState={boardCreateMenu} />
            )}
        </ul>
    )
}
