import { Link } from 'react-router-dom'

export function Home() {
    return (
        <div id="home-page">
            <h1>Home page</h1>
            <Link to="/login">Log In</Link>
        </div>
    )
}
