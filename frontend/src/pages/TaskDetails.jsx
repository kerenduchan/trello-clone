import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { TaskDescription } from '../cmp/task/description/TaskDescription'
import { TaskDetailsActivity } from '../cmp/task/TaskDetailsActivity'
import { TaskDetailsSidebar } from '../cmp/task/TaskDetailsSidebar'
import { ChecklistList } from '../cmp/task/checklist/ChecklistList'
import { LabelsWidget } from '../cmp/task/label/LabelsWidget'
import { TaskDetailsHeader } from '../cmp/task/TaskDetailsHeader'
import { MembersWidget } from '../cmp/task/members/MembersWidget'
import { TaskDatesWidget } from '../cmp/task/dates/TaskDatesWidget'
import { TaskAttachments } from '../cmp/task/attachment/TaskAttachments'
import { curChecklistChanged } from '../store/reducers/app.reducer'

export function TaskDetails({ hierarchy }) {
    const { task } = hierarchy

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (!hierarchy.task) {
            // task was moved to a different board
            onClose()
        }
    }, [])

    function onClose() {
        dispatch(curChecklistChanged(null))
        navigate(`/b/${params.boardId}`)
    }

    function getTaskTheme() {
        return task.cover?.theme || ''
    }

    if (!hierarchy.task) return <></>

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div
                className={`task-details task-theme-${getTaskTheme()}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <TaskDetailsHeader hierarchy={hierarchy} onClose={onClose} />

                {/* Main section */}
                <div className="main">
                    {/* Widgets */}
                    <div className="widgets">
                        <MembersWidget hierarchy={hierarchy} />
                        <LabelsWidget hierarchy={hierarchy} />
                        <TaskDatesWidget hierarchy={hierarchy} />
                    </div>

                    {/* Description, checklists, attachments, activity */}
                    <TaskDescription hierarchy={hierarchy} />
                    <ChecklistList hierarchy={hierarchy} />
                    <TaskAttachments hierarchy={hierarchy} />
                    <TaskDetailsActivity hierarchy={hierarchy} />
                </div>

                {/* Sidebar */}
                <TaskDetailsSidebar hierarchy={hierarchy} />
            </div>
        </div>
    )
}
