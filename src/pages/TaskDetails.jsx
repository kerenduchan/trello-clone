import { useNavigate, useParams } from 'react-router'
import { TaskDetailsDescription } from '../cmp/task/TaskDetailsDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { ChecklistList } from '../cmp/task/checklist/ChecklistList'
import { LabelList } from '../cmp/task/label/LabelList'
import { TaskDetailsHeader } from '../cmp/task/TaskDetailsHeader'
import { setNewChecklist } from '../store/actions/app.actions'

export function TaskDetails({ hierarchy }) {
    const { task } = hierarchy
    const navigate = useNavigate()
    const params = useParams()

    function onClose() {
        setNewChecklist(null)
        navigate(`/b/${params.boardId}`)
    }

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div className="task-details" onClick={(e) => e.stopPropagation()}>
                <TaskDetailsHeader hierarchy={hierarchy} onClose={onClose} />
                <div className="main">
                    <LabelList hierarchy={hierarchy} />
                    <TaskDetailsDescription task={task} />
                    <ChecklistList hierarchy={hierarchy} />
                    <TaskDetailsActivity hierarchy={hierarchy} />
                </div>
                <TaskDetailsSidebar hierarchy={hierarchy} />
            </div>
        </div>
    )
}
