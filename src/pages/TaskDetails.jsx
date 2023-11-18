import { useNavigate, useParams } from 'react-router'
import { CircleBtn } from '../cmp/CircleBtn'
import { TaskDetailsDescription } from '../cmp/TaskDetailsDescription'

export function TaskDetails({ task }) {
    const navigate = useNavigate()
    const params = useParams()

    function onClose() {
        navigate(`/b/${params.boardId}`)
    }

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div className="task-details" onClick={(e) => e.stopPropagation()}>
                <CircleBtn type="close" onClick={onClose} />
                {task.cover && (
                    <div
                        className="cover"
                        style={{
                            backgroundColor: task.cover.bgColor,
                        }}
                    ></div>
                )}
                <div className="header">
                    <div className="icon material-symbols-outlined">
                        credit_card
                    </div>
                    <h1 className="title">{task.title}</h1>
                    <p className="subtitle">in list...</p>
                </div>
                <div className="main">
                    <TaskDetailsDescription task={task} />
                </div>
            </div>
        </div>
    )
}
