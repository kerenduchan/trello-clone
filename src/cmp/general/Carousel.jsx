export function Carousel({ width, height, gap = 20, items, itemIdx }) {
    function getMargin() {
        return -itemIdx * (width + gap)
    }

    function getTotalWidth() {
        return items.length * (width + gap) - gap
    }

    return (
        <div className="carousel">
            <div className="view" style={{ width, height }}>
                <div
                    className="all-items"
                    style={{
                        gap,
                        width: getTotalWidth(),
                        marginInlineStart: getMargin(),
                    }}
                >
                    {items.map((item, idx) => (
                        <div
                            className="one-item"
                            key={idx}
                            style={{ width, height }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
