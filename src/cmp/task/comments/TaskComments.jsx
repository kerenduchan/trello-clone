import { useState } from 'react'
import { TaskCommentsForm } from './TaskCommentsForm'
import { useForm } from '../../../customHooks/useForm'
import { boardService } from '../../../services/board.service'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'

export function TaskComments({ hierarchy }) {
    const { task } = hierarchy

    // TODO: show form and comment if comment draft exists on the task
    const [showForm, setShowForm] = useState(false)

    const [draft, handleChange, setDraft] = useForm({ text: '' })

    useKeyDownListener(['Escape'], onHideForm)

    function onHideForm() {
        setShowForm(false)
    }

    function onShowForm() {
        setShowForm(true)
    }

    function onSubmitForm() {
        // addComment(hierarchy, draft)
        setDraft({ text: '' })
        onHideForm()
    }

    return (
        <div className="task-comments">
            {showForm ? (
                <TaskCommentsForm
                    draft={draft}
                    handleChange={handleChange}
                    onClose={onHideForm}
                    onSubmit={onSubmitForm}
                />
            ) : (
                <button className="btn-create" onClick={onShowForm}>
                    Write a comment...
                </button>
            )}
        </div>
    )
}
