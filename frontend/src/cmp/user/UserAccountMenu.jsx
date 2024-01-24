import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
    loggedinUserChanged,
    selectLoggedinUser,
} from '../../store/reducers/app.reducer'
import { userService } from '../../services/user/user.service'
import { logout } from '../../store/actions/auth.actions'
import { Popover } from '../general/Popover'

export function UserAccountMenu({ popover }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedinUser = useSelector(selectLoggedinUser)

    async function onLogout() {
        try {
            await logout()
            dispatch(loggedinUserChanged(null))
            navigate('/')
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    const { refEl, onClose } = popover

    if (!loggedinUser) return <></>

    return (
        <Popover
            className="popover-menu user-account-menu"
            refEl={refEl}
            onClose={onClose}
        >
            <div className="header">
                <h2>Account</h2>
                <div className="user">
                    <img
                        className="user-avatar"
                        src={userService.getImgUrl(loggedinUser)}
                    />
                    <div className="fullname">{loggedinUser.fullname}</div>
                    <div className="username">{loggedinUser.username}</div>
                </div>
            </div>
            <div className="content">
                <hr />
                <button className="btn-logout" onClick={onLogout}>
                    Log out
                </button>
            </div>
        </Popover>
    )
}
