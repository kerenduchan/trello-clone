import { useNavigate, useParams } from 'react-router'
import { TaskDetailsDescription } from '../cmp/task/TaskDetailsDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { ChecklistList } from '../cmp/task/checklist/ChecklistList'
import { LabelList } from '../cmp/task/label/LabelList'
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
                    <LabelList board={board} group={group} task={task} />
                    <TaskDetailsDescription task={task} />
                    <ChecklistList board={board} group={group} task={task} />
                    <TaskDetailsActivity task={task} />
                </div>
                <TaskDetailsSidebar board={board} group={group} task={task} />
            </div>
        </div>
    )
}
