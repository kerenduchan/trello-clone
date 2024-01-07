import { useContext } from 'react'
import { authService } from '../../services/auth.service'
import { Popover } from '../general/Popover'
import { LoginContext } from '../../contexts/LoginContext'
import { useNavigate } from 'react-router'

export function UserAccountMenu({ popover }) {
    const navigate = useNavigate()
    const { setLoggedinUser } = useContext(LoginContext)

    async function onLogout() {
        try {
            await authService.logout()
            setLoggedinUser(null)
            navigate('/')
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    const { refEl, onClose } = popover
    return (
        <Popover
            className="popover-menu user-account-menu"
            refEl={refEl}
            onClose={onClose}
        >
            <div className="header">
                <h2>ACCOUNT</h2>
            </div>
            <div className="content">
                <button className="btn-logout" onClick={onLogout}>
                    Log out
                </button>
            </div>
        </Popover>
    )
}
