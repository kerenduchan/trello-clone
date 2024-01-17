import { useDispatch, useSelector } from 'react-redux'
import { authService } from '../../services/auth/auth.service'
import { Popover } from '../general/Popover'
import { useNavigate } from 'react-router'
import {
    loggedinUserChanged,
    selectLoggedinUser,
} from '../../store/reducers/app.reducer'

export function UserAccountMenu({ popover }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedinUser = useSelector(selectLoggedinUser)

    async function onLogout() {
        try {
            await authService.logout()
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
                    <img className="user-avatar" src={loggedinUser.imgUrl} />
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
