import { useState } from 'react'
import { updateTask } from '../../../store/actions/board.actions'
import { useForm } from '../../../customHooks/useForm'
import { useClickedOutListener } from '../../../customHooks/useClickedOutListener'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { TaskDetailsSubsectionHeader } from '../TaskDetailsSubsectionHeader'
import { TaskDescriptionForm } from './TaskDescriptionForm'
import { useRef } from 'react'

export function TaskDescription({ hierarchy }) {
    const { task } = hierarchy
    const [showForm, setShowForm] = useState(false)
    const elRef = useRef(null)

    // Need this here and not in the form component because clicking out
    // of the component (and not just the form) needs to save the draft
    const [draft, handleChange, setDraft] = useForm(null)

    useKeyDownListener(['Escape'], onHideForm)
    useClickedOutListener([elRef], onSubmitForm)

    function onHideForm() {
        setShowForm(false)
    }

    function onShowForm() {
        setDraft({ description: task.description })
        setShowForm(true)
    }

    function onSubmitForm() {
        updateTask(hierarchy, draft)
        onHideForm()
    }

    // the content is either the task description, the edit form, or the
    // large add description button
    function getContent() {
        if (showForm) {
            return (
                <TaskDescriptionForm
                    draft={draft}
                    handleChange={handleChange}
                    onClose={onHideForm}
                    onSubmit={onSubmitForm}
                />
            )
        }
        if (task.description) {
            return (
                <pre className="text" onClick={onShowForm}>
                    {task.description}
                </pre>
            )
        }
        return (
            <SecondaryBtn
                className="add-btn"
                text="Add a more detailed description..."
                onClick={onShowForm}
            />
        )
    }

    return (
        <div ref={elRef} className="task-description">
            <TaskDetailsSubsectionHeader icon="description" title="Description">
                {task.description && !showForm && (
                    <SecondaryBtn
                        className="title-btn"
                        text="Edit"
                        onClick={() => setShowForm(true)}
                    />
                )}
            </TaskDetailsSubsectionHeader>

            <div className="content">{getContent()}</div>
        </div>
    )
}
