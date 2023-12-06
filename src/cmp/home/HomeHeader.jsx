import { Link } from 'react-router-dom'

export function HomeHeader() {
    return (
        <header className="home-header-bg">
            <div className="home-header">
                <img className="logo" src="krello.svg" />
                <div className="login-btns">
                    <Link to="/boards" className="btn-go-to-your-boards">
                        Go to your boards
                    </Link>
                </div>
            </div>
        </header>
    )
}
