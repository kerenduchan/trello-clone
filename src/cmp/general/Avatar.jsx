export function Avatar({ imgSrc, size = 'sm' }) {
    return (
        <div className={`avatar ${size}`}>
            <img src={imgSrc} />
            <div className="overlay" />
        </div>
    )
}
