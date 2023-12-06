export function HomeInActionCard({ card }) {
    const { backgroundColor, img, title, text } = card
    console.log({ backgroundImage: img })
    return (
        <div className="home-in-action-card">
            <div className="top-color-bar" style={{ backgroundColor }} />
            <div
                className="card-icon"
                style={{ backgroundImage: `url(${img})` }}
            />

            <div className="content">
                <h3 className="title">{title}</h3>
                <p className="text">{text}</p>
            </div>
        </div>
    )
}
