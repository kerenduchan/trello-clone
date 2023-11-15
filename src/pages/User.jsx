import { useLocation, useParams } from 'react-router'
import { Boards } from './Boards'

export function User() {
    const params = useParams()
    const location = useLocation()

    return (
        <div id="user">
            {location.pathname.split('/').at(-1) == 'boards' ? (
                <Boards />
            ) : (
                <h1>User page for {params.userId}</h1>
            )}
        </div>
    )
}
