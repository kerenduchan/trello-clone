import { Link } from 'react-router-dom'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { BoardCreate } from './BoardCreate'
import { PopoverMenu } from '../general/PopoverMenu'

export function BoardIndexHeader() {
    const createBoardMenu = usePopoverState()

    return (
        <>
            <header className="board-index-header">
                <img className="logo" src="krello.svg" />

                <Link to="/boards">Boards</Link>
                <button
                    className="btn-primary"
                    {...createBoardMenu.triggerAndTarget}
                >
                    Create Board
                </button>
                <div className="avatar">{'<User Avatar>'}</div>
            </header>

            {/* Create Board menu */}
            {createBoardMenu.show && (
                <PopoverMenu title="Create Board" {...createBoardMenu.popover}>
                    <BoardCreate onClose={createBoardMenu.onClose} />
                </PopoverMenu>
            )}
        </>
    )
}
