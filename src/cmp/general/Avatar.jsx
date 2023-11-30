export function Avatar({ imgSrc }) {
    return (
        <div className="avatar">
            <img src={imgSrc} />
            <div className="overlay" />
        </div>
    )
}
