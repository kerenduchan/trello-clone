import { useNavigate, useParams } from 'react-router'
import { Icon } from '../cmp/general/Icon'
import { CircleBtn } from '../cmp/general/btn/CircleBtn'
import { TaskDetailsDescription } from '../cmp/task/TaskDetailsDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { TaskDetailsChecklists } from '../cmp/task/TaskDetailsChecklists'
import { TaskDetailsLabels } from '../cmp/task/TaskDetailsLabels'

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
                    <TaskDetailsLabels labels={task.labels} />
                    <TaskDetailsDescription task={task} />
                    <TaskDetailsChecklists checklists={task.checklists} />
                    <TaskDetailsActivity task={task} />
                </div>
                <TaskDetailsSidebar />
            </div>
        </div>
    )
}
