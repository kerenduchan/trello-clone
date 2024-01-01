import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { TaskDescription } from '../cmp/task/description/TaskDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { ChecklistList } from '../cmp/task/checklist/ChecklistList'
import { LabelsWidget } from '../cmp/task/label/LabelsWidget'
import { TaskDetailsHeader } from '../cmp/task/TaskDetailsHeader'
import { setCurChecklist } from '../store/actions/app.actions'
import { MembersWidget } from '../cmp/task/members/MembersWidget'
import { TaskDatesWidget } from '../cmp/task/dates/TaskDatesWidget'

export function TaskDetails({ hierarchy }) {
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (!hierarchy.task) {
            // task was moved to a different board
            onClose()
        }
    }, [])

    function onClose() {
        setCurChecklist(null)
        navigate(`/b/${params.boardId}`)
    }

    if (!hierarchy.task) return <></>

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div className="task-details" onClick={(e) => e.stopPropagation()}>
                <TaskDetailsHeader hierarchy={hierarchy} onClose={onClose} />
                <div className="main">
                    <div className="widgets">
                        <MembersWidget hierarchy={hierarchy} />
                        <LabelsWidget hierarchy={hierarchy} />
                        <TaskDatesWidget hierarchy={hierarchy} />
                    </div>
                    <TaskDescription hierarchy={hierarchy} />
                    <ChecklistList hierarchy={hierarchy} />
                    <TaskDetailsActivity hierarchy={hierarchy} />
                </div>
                <TaskDetailsSidebar hierarchy={hierarchy} />
            </div>
        </div>
    )
}
