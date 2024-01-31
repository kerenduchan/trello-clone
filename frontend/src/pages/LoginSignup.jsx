import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loggedinUserChanged } from '../store/reducers/app.reducer'
import { login, signup } from '../store/actions/auth.actions.js'
import { useForm } from '../customHooks/useForm'

export function LoginSignup() {
    const dispatch = useDispatch()
    const location = useLocation()
    const [draft, handleChange] = useForm({
        username: '',
        password: '',
        fullname: '',
    })
    const [errorMsg, setErrorMsg] = useState(null)

    const navigate = useNavigate()

    async function onSubmit(e) {
        e.preventDefault()
        try {
            const user = isLogin() ? await login(draft) : await signup(draft)

            dispatch(loggedinUserChanged(user))
            navigate(`/boards`)
        } catch (err) {
            console.error(err)
            setErrorMsg(err)
        }
    }

    function isLogin() {
        return location.pathname === '/login'
    }

    return (
        <div className="login-signup">
            <div className="content">
                <div className="header">
                    <img className="logo" src="/krello.svg" />
                    <h5>{isLogin() ? 'Log in' : 'Sign up'} to continue</h5>
                </div>
                <form onSubmit={onSubmit}>
                    {!isLogin() && (
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={draft.fullname}
                            onChange={handleChange}
                        />
                    )}
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={draft.username}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={draft.password}
                        onChange={handleChange}
                    />
                    <button className="btn-primary btn-continue">
                        Continue
                    </button>
                    {errorMsg && <div className="error">{errorMsg}</div>}
                </form>

                <div className="switch-login-signup">
                    {isLogin() ? (
                        <Link className="link" to="/signup">
                            Create an account
                        </Link>
                    ) : (
                        <Link className="link" to="/login">
                            Already have an account? Log in
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
