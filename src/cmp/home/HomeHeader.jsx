import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../contexts/LoginContext'

export function HomeHeader() {
    const { loggedinUser } = useContext(LoginContext)

    return (
        <header className="home-header-bg">
            <div className="home-header">
                <img className="logo" src="krello.svg" />

                <div className="actions-container">
                    {loggedinUser ? (
                        <Link to="/boards" className="btn-go-to-your-boards">
                            Go to your boards
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn-login">
                                Log in
                            </Link>
                            <Link to="/signup" className="btn-signup">
                                Get Krello for free
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
