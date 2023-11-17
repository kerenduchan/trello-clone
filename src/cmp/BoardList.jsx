import { Link } from 'react-router-dom'

export function BoardList({ boards }) {
    return (
        <ul>
            {boards.map((b) => (
                <li key={b._id}>
                    <Link to={`/b/${b._id}`}>{b.name}</Link>
                </li>
            ))}
        </ul>
    )
}
