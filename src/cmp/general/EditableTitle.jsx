import { useState } from 'react'
import { buildClassName } from '../../util'
import { TitleEditForm } from '../general/TitleEditForm'

export function EditableTitle({ title, onChange }) {
    const [showForm, setShowForm] = useState(false)

    function onTitleClick() {
        setShowForm(true)
    }

    function onSubmit(draft) {
        onChange(draft.title)
        setShowForm(false)
    }

    return (
        <div
            className={buildClassName(
                'editable-title',
                showForm ? ' edit' : ''
            )}
        >
            <h1 onClick={onTitleClick}>{title}</h1>
            {showForm && <TitleEditForm title={title} onSubmit={onSubmit} />}
        </div>
    )
}
