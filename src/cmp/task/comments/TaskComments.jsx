import { useState } from 'react'
import { TaskCommentsForm } from './TaskCommentsForm'
import { useForm } from '../../../customHooks/useForm'
import { boardService } from '../../../services/board.service'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'
import { addTaskComment } from '../../../store/actions/board.actions'
import { TaskCommentsItem } from './TaskCommentsItem'

export function TaskComments({ hierarchy }) {
    const { task } = hierarchy
    const [selectedItemId, setSelectedItemId] = useState()

    // TODO: show form and comment if comment draft exists on the task
    const [showForm, setShowForm] = useState(false)

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyComment()
    )

    useKeyDownListener(['Escape'], onHideForm)

    function onHideForm() {
        setShowForm(false)
    }

    function onShowForm() {
        setShowForm(true)
    }

    function onSubmitForm() {
        addTaskComment(hierarchy, { ...draft, createdAt: Date.now() })
        setDraft(boardService.getEmptyComment())
        onHideForm()
    }

    return (
        <div className="task-comments">
            {showForm ? (
                <TaskCommentsForm
                    draft={draft}
                    handleChange={handleChange}
                    onSubmit={onSubmitForm}
                />
            ) : (
                <button className="btn-create" onClick={onShowForm}>
                    Write a comment...
                </button>
            )}

            <ul className="comments-list">
                {task.comments?.map((c) => (
                    <li key={c._id}>
                        <TaskCommentsItem
                            hierarchy={hierarchy}
                            item={c}
                            isSelected={selectedItemId === c._id}
                            onClick={() => setSelectedItemId(c._id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
