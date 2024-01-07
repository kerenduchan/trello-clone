import { useNavigate } from 'react-router'
import { authService } from '../services/auth.service'

export function Login() {
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        await authService.login({
            _id: 'u101',
            username: 'keren',
            fullname: 'Keren Duchan',
        })

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
