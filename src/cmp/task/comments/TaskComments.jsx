import { useState } from 'react'
import { TaskCommentsForm } from './TaskCommentsForm'

export function TaskComments({ hierarchy }) {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="task-comments">
            {showForm ? (
                <TaskCommentsForm hierarchy={hierarchy} />
            ) : (
                <button
                    className="create-btn"
                    onClick={() => setShowForm(true)}
                >
                    Write a comment...
                </button>
            )}
        </div>
    )
}
