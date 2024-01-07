import { useNavigate } from 'react-router'
import { authService } from '../services/auth.service'
import { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'

export function Login() {
    const { setLoggedinUser } = useContext(LoginContext)
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        const user = await authService.login({
            _id: 'u101',
            username: 'keren',
            fullname: 'Keren Duchan',
            imgUrl: 'images/keren-avatar.jpg',
        })
        setLoggedinUser(user)
        navigate(`/boards`)
    }

    return (
        <div className="login-signup">
            <div className="content">
                <div className="header">
                    <img className="logo" src="krello.svg" />
                    <h5>Log in to continue</h5>
                </div>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                    ></input>
                    <button className="btn-primary btn-continue">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    )
}
