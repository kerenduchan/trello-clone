import { useEffect, useRef, useState } from 'react'
import { buildClassName } from '../../util'
import { useForm } from '../../customHooks/useForm'

export function EditableTitle({ title, onChange }) {
    const [showForm, setShowForm] = useState(false)
    const [draft, handleChange] = useForm({ title })
    const textareaRef = useRef(null)

    useEffect(() => {
        if (showForm) {
            textareaRef.current.select()
        }
    }, [showForm])

    function onSubmit(e) {
        e.preventDefault()
        onChange(draft.title)
        setShowForm(false)
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    return (
        <div className={buildClassName('editable-title', showForm && 'edit')}>
            <span className="title" onClick={() => setShowForm(true)}>
                {/* using draft.title for auto-resize of textarea in grid */}
                {draft.title}
            </span>
            <form onSubmit={onSubmit}>
                {/* using a textarea and not an input for more robust styling */}
                <textarea
                    rows="1"
                    ref={textareaRef}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    value={draft.title}
                    onBlur={onSubmit}
                />
            </form>
        </div>
    )
}
