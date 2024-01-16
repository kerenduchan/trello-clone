import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { boardService } from '../../services/board/board.service'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { LoginContext } from '../../contexts/LoginContext'
import { BoardCreate } from './BoardCreate'
import { PopoverMenu } from '../general/PopoverMenu'
import { UserAccountMenu } from '../user/UserAccountMenu'

export function BoardIndexHeader({ board }) {
    const navigate = useNavigate()
    const { loggedinUser } = useContext(LoginContext)
    const createBoardMenu = usePopoverState()
    const userAccountMenu = usePopoverState()

    function onLogoClick() {
        navigate('/')
    }

    function getLogo() {
        if (boardService.getBoardTheme(board) === 'light') {
            return 'krello.svg'
        }
        return 'krello-white.svg'
    }

    return (
        <>
            <header className="board-index-header">
                <button className="btn-dynamic" onClick={onLogoClick}>
                    <img className="logo" src={getLogo()} />
                </button>

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
