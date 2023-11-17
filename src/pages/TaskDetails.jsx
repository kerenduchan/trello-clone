import { useNavigate, useParams } from 'react-router'
import { CircleButton } from '../cmp/CircleButton'

export function TaskDetails({ task }) {
    const navigate = useNavigate()
    const params = useParams()

    function onClose() {
        console.log('onClose')
        navigate(`/b/${params.boardId}`)
    }

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div className="task-details" onClick={(e) => e.stopPropagation()}>
                <CircleButton type="close" />
                <h1 className="title">{task.title}</h1>
            </div>
        </div>
    )
}
