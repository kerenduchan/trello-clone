import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { boardService } from '../../services/board/board.service'
import { userService } from '../../services/user/user.service'
import { usePopoverState } from '../../customHooks/usePopoverState'
import { BoardCreate } from './BoardCreate'
import { UserAccountMenu } from '../user/UserAccountMenu'
import { selectLoggedinUser } from '../../store/reducers/app.reducer'
import { Icon } from '../general/Icon'

export function BoardIndexHeader({ board }) {
    const location = useLocation()
    const navigate = useNavigate()
    const loggedinUser = useSelector(selectLoggedinUser)
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
                {/* Logo */}
                <button className="btn-dynamic btn-logo" onClick={onLogoClick}>
                    <img className="logo" src={getLogo()} />
                </button>

                {/* Button that links to board index */}
                {location.pathname !== '/boards' && (
                    <Link
                        to="/boards"
                        className="btn-dynamic-wide btn-board-link"
                    >
                        Boards
                    </Link>
                )}

                {/* Create board button */}
                <button
                    className={`btn-create-board ${
                        createBoardMenu.show ? 'active' : ''
                    }`}
                    {...createBoardMenu.triggerAndTarget}
                >
                    <Icon className="for-narrow-layout" type="add" />
                    <span className="for-normal-layout">Create Board</span>
                </button>

                {/* User avatar button */}
                <button
                    className="user-avatar"
                    {...userAccountMenu.triggerAndTarget}
                >
                    <img src={userService.getImgUrl(loggedinUser)} />
                </button>
            </header>

            {/* Create Board menu */}
            {createBoardMenu.show && (
                <BoardCreate popoverState={createBoardMenu} />
            )}

            {/* User account menu */}
            {userAccountMenu.show && (
                <UserAccountMenu popover={userAccountMenu.popover} />
            )}
        </>
    )
}
