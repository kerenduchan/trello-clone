import { Link } from 'react-router-dom'

export function Home() {
    const icons = [
        'people',
        'star',
        'board',
        'filter',
        'more',
        'add',
        'down',
        'clock',
        'attach',
        'description',
        'edit',
        'comment',
        'label',
        'checklist',
    ]

    return (
        <div id="home-page">
            <h1>Home page</h1>
            <Link to="/login">Log In</Link>

            <h1>Icons</h1>
            <ul style={{ display: 'flex', gap: '10px' }}>
                {icons.map((icon) => (
                    <li key={icon}>
                        <img src={`images/${icon}.svg`} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
