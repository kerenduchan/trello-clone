import { useNavigate, useParams } from 'react-router'
import { TaskDescription } from '../cmp/task/description/TaskDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { ChecklistList } from '../cmp/task/checklist/ChecklistList'
import { LabelList } from '../cmp/task/label/LabelList'
import { TaskDetailsHeader } from '../cmp/task/TaskDetailsHeader'
import { setNewChecklist } from '../store/actions/app.actions'
import { TaskMembers } from '../cmp/task/members/TaskMembers'

export function TaskDetails({ hierarchy }) {
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
                    <TaskMembers hierarchy={hierarchy} />
                    <TaskDescription hierarchy={hierarchy} />
                    <ChecklistList hierarchy={hierarchy} />
                    <TaskDetailsActivity hierarchy={hierarchy} />
                </div>
                <TaskDetailsSidebar hierarchy={hierarchy} />
            </div>
        </div>
    )
}
