import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { authService } from '../services/auth.service'
import { useForm } from '../customHooks/useForm'
import { LoginContext } from '../contexts/LoginContext'

export function Login() {
    const [draft, handleChange] = useForm({ username: '', password: '' })
    const [errorMsg, setErrorMsg] = useState(null)

    const { setLoggedinUser } = useContext(LoginContext)
    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const user = await authService.login(draft)
            setLoggedinUser(user)
            navigate(`/boards`)
        } catch (err) {
            console.log(err)
            setErrorMsg(err)
        }
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
                        name="username"
                        placeholder="Enter your username"
                        value={draft.username}
                        onChange={handleChange}
                    ></input>
                    <button className="btn-primary btn-continue">
                        Continue
                    </button>
                    {errorMsg && <div className="error">{errorMsg}</div>}
                </form>
            </div>
        </div>
    )
}
