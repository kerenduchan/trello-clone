import { Home101 } from '../cmp/home/Home101'
import { HomeFooter } from '../cmp/home/HomeFooter'
import { HomeHeader } from '../cmp/home/HomeHeader'
import { HomeInAction } from '../cmp/home/HomeInAction'
import { HomeTopSection } from '../cmp/home/HomeTopSection'

export function Home() {
    return (
        <div className="home">
            <HomeHeader />
            <section className="content">
                <HomeTopSection />
                <Home101 />
                <HomeInAction />
                <HomeFooter />
            </section>
        </div>
    )
}
