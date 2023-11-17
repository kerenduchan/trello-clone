import { useLocation, useParams } from 'react-router'
import { Workspace } from './Workspace'

export function User() {
    const params = useParams()
    const location = useLocation()

    return (
        <div id="user">
            {location.pathname.split('/').at(-1) == 'boards' ? (
                <Workspace />
            ) : (
                <h1>User page for {params.userId}</h1>
            )}
        </div>
    )
}
