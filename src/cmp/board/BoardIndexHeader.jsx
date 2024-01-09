import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { LoginContext } from '../../contexts/LoginContext'
import { BoardCreate } from './BoardCreate'
import { PopoverMenu } from '../general/PopoverMenu'
import { UserAccountMenu } from '../user/UserAccountMenu'

export function BoardIndexHeader() {
    const { loggedinUser } = useContext(LoginContext)
    const createBoardMenu = usePopoverState()
    const userAccountMenu = usePopoverState()

    return (
        <>
            <header className="board-index-header">
                <Link to="/">
                    <img className="logo" src="krello.svg" />
                </Link>

                <Link to="/boards" className="btn-dynamic-wide">
                    Boards
                </Link>
                <button
                    className="btn-dynamic-wide"
                    {...createBoardMenu.triggerAndTarget}
                >
                    Create Board
                </button>
                <button
                    className="user-avatar"
                    {...userAccountMenu.triggerAndTarget}
                >
                    <img src={loggedinUser.imgUrl} />
                </button>
            </header>

            {/* Create Board menu */}
            {createBoardMenu.show && (
                <PopoverMenu title="Create Board" {...createBoardMenu.popover}>
                    <BoardCreate onClose={createBoardMenu.onClose} />
                </PopoverMenu>
            )}

            {/* User account menu */}
            {userAccountMenu.show && (
                <UserAccountMenu popover={userAccountMenu.popover} />
            )}
        </>
    )
}
