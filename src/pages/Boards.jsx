import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getBoards } from '../util'

export function Boards() {
    const params = useParams()

    return (
        <div id="boards">
            <h1>Boards for {params.userId}</h1>

            <ul>
                {getBoards().map((b) => (
                    <li key={b._id}>
                        <Link to={`/b/${b._id}/${b.slug}`}>{b.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
