import { useNavigate, useParams } from 'react-router'
import { CircleBtn } from '../cmp/general/btn/CircleBtn'
import { Description } from '../cmp/task-details/Description'
import { Activity } from '../cmp/task-details/Activity'
import { Sidebar } from '../cmp/task-details/Sidebar'
import { Icon } from '../cmp/general/Icon'
import { Checklists } from '../cmp/task-details/Checklists'
import { Labels } from '../cmp/task-details/Labels'

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
                    <Icon type="card" size="md" />
                    <h1 className="title">{task.title}</h1>
                    <p className="subtitle">
                        in list{' '}
                        <span className="group-title">{task.group.title}</span>
                    </p>
                </div>
                <div className="main">
                    <Labels labels={task.labels} />
                    <Description task={task} />
                    <Checklists checklists={task.checklists} />
                    <Activity task={task} />
                </div>
                <Sidebar />
            </div>
        </div>
    )
}
