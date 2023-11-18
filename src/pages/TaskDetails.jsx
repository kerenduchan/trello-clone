import { useNavigate, useParams } from 'react-router'
import { CircleBtn } from '../cmp/CircleBtn'
import { TaskDetailsDescription } from '../cmp/TaskDetailsDescription'
import { TaskDetailsActivity } from '../cmp/TaskDetailsActivity'
import { SecondaryBtn } from '../cmp/SecondaryBtn'

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
                    <TaskDetailsActivity task={task} />
                </div>
                <div className="sidebar">
                    <h3>Suggested</h3>
                    <SecondaryBtn>Join</SecondaryBtn>

                    <h3>Add to card</h3>
                    <SecondaryBtn>Members</SecondaryBtn>
                    <SecondaryBtn>Labels</SecondaryBtn>
                    <SecondaryBtn>Checklist</SecondaryBtn>
                    <SecondaryBtn>Dates</SecondaryBtn>
                    <SecondaryBtn>Attachment</SecondaryBtn>
                    <SecondaryBtn>Cover</SecondaryBtn>
                    <SecondaryBtn>Custom Fields</SecondaryBtn>
                </div>
            </div>
        </div>
    )
}
