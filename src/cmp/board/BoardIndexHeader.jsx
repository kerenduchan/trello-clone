import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { LoginContext } from '../../contexts/LoginContext'
import { BoardCreate } from './BoardCreate'
import { PopoverMenu } from '../general/PopoverMenu'

export function BoardIndexHeader() {
    const { loggedinUser } = useContext(LoginContext)
    const createBoardMenu = usePopoverState()

    console.log(loggedinUser)

    return (
        <>
            <header className="board-index-header">
                <Link to="/">
                    <img className="logo" src="krello.svg" />
                </Link>

                <Link to="/boards">Boards</Link>
                <button
                    className="btn-primary"
                    {...createBoardMenu.triggerAndTarget}
                >
                    Create Board
                </button>
                <button className="user-avatar">
                    <img src={loggedinUser.imgUrl} />
                </button>
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
