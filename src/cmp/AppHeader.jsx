import { Link } from 'react-router-dom'
import { usePopoverState } from '../customHooks/usePopoverState'
import { BoardCreate } from './board/BoardCreate'
import { PopoverMenu } from './general/PopoverMenu'

export function AppHeader() {
    const createBoardMenu = usePopoverState()

    return (
        <>
            <header className="app-header">
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
