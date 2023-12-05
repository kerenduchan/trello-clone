import { Link } from 'react-router-dom'
import { HomeHeader } from '../cmp/home/HomeHeader'

export function Home() {
    return (
        <div id="home">
            <HomeHeader />
            <section className="content">
                <h1>Home page</h1>
                <Link to="/login">Log In</Link>
            </section>
        </div>
    )
}
