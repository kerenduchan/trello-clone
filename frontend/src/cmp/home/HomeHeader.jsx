import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectLoggedinUser } from '../../store/reducers/app.reducer'

export function HomeHeader() {
    const loggedinUser = useSelector(selectLoggedinUser)

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
