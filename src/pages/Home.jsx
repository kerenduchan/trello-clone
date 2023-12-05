import { HomeHeader } from '../cmp/home/HomeHeader'
import { HomeTopSection } from '../cmp/home/HomeTopSection'

export function Home() {
    return (
        <div id="home">
            <HomeHeader />
            <section className="content">
                <HomeTopSection />
            </section>
        </div>
    )
}
