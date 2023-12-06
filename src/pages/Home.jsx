import { Home101 } from '../cmp/home/Home101'
import { HomeHeader } from '../cmp/home/HomeHeader'
import { HomeTopSection } from '../cmp/home/HomeTopSection'

export function Home() {
    return (
        <div id="home">
            <HomeHeader />
            <section className="content">
                <HomeTopSection />
                <Home101 />
            </section>
        </div>
    )
}
