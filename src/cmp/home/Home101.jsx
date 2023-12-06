import { useState } from 'react'
import { Carousel } from '../general/Carousel'

export function Home101() {
    const [itemIdx, setItemIdx] = useState(0)

    const btns = [
        {
            title: 'Boards',
            text: 'Krello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”',
        },
        {
            title: 'Lists',
            text: 'The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Krello.',
        },
        {
            title: 'Cards',
            text: 'Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.',
        },
    ]

    const items = [
        'images/carousel-boards.png',
        'images/carousel-lists.png',
        'images/carousel-cards.png',
    ]

    return (
        <section className="home-101-bg">
            <div className="home-101">
                <p className="home-section-title">Krello 101</p>
                <h2>A productivity powerhouse</h2>
                <p>
                    Simple, flexible, and powerful. All it takes are boards,
                    lists, and cards to get a clear view of who's doing what and
                    what needs to get done. Learn more in our{' '}
                    <a>guide for getting started</a>.
                </p>

                <div className="carousel-and-btns">
                    <div className="carousel-btns">
                        {btns.map((btn, idx) => (
                            <div
                                className={`carousel-btn ${
                                    idx === itemIdx ? 'selected' : ''
                                }`}
                                onClick={() => setItemIdx(idx)}
                            >
                                <h3>{btn.title}</h3>
                                <p>{btn.text}</p>
                                <div className="marker" />
                            </div>
                        ))}
                    </div>

                    <Carousel
                        width={728}
                        height={488}
                        items={items}
                        itemIdx={itemIdx}
                    />
                </div>
            </div>
        </section>
    )
}
