import { useState } from 'react'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { TaskDetailsSubsectionHeader } from '../TaskDetailsSubsectionHeader'
import { TaskDescriptionForm } from './TaskDescriptionForm'

export function TaskDescription({ hierarchy }) {
    const { task } = hierarchy
    const [showForm, setShowForm] = useState(false)

    // the content is either the task description, the edit form, or the
    // large add description button
    function getContent() {
        if (showForm) {
            return (
                <TaskDescriptionForm
                    hierarchy={hierarchy}
                    onClose={() => setShowForm(false)}
                />
            )
        }
        if (task.description) {
            return (
                <pre className="text" onClick={() => setShowForm(true)}>
                    {task.description}
                </pre>
            )
        }
        return (
            <SecondaryBtn
                className="add-btn"
                text="Add a more detailed description..."
                onClick={() => setShowForm(true)}
            />
        )
    }

    return (
        <div className="task-description">
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
