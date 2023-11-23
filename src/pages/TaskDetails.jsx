import { useNavigate, useParams } from 'react-router'
import { Icon } from '../cmp/general/Icon'
import { CircleBtn } from '../cmp/general/btn/CircleBtn'
import { TaskDetailsDescription } from '../cmp/task/TaskDetailsDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { TaskDetailsChecklists } from '../cmp/task/TaskDetailsChecklists'
import { TaskDetailsLabels } from '../cmp/task/TaskDetailsLabels'
import { TaskDetailsHeader } from '../cmp/task/TaskDetailsHeader'

export function TaskDetails({ board, group, task }) {
    const navigate = useNavigate()
    const params = useParams()

    function onClose() {
        navigate(`/b/${params.boardId}`)
    }

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div className="task-details" onClick={(e) => e.stopPropagation()}>
                <TaskDetailsHeader
                    board={board}
                    group={group}
                    task={task}
                    onClose={onClose}
                />
                <div className="main">
                    <TaskDetailsLabels labels={task.labels} />
                    <TaskDetailsDescription task={task} />
                    <TaskDetailsChecklists checklists={task.checklists} />
                    <TaskDetailsActivity task={task} />
                </div>
                <TaskDetailsSidebar board={board} task={task} />
            </div>
        </div>
    )
}
