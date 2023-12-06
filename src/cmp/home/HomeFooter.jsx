export function HomeFooter() {
    const socials = ['instagram', 'facebook', 'linkedin', 'twitter', 'youtube']

    return (
        <footer className="home-footer">
            <div className="content">
                <section></section>
                <section className="social-media-links">
                    {socials.map((s, idx) => (
                        <div key={idx} className="social-media-link">
                            <img src={`images/${s}-icon.svg`} />
                        </div>
                    ))}
                </section>
            </div>
        </footer>
    )
}
