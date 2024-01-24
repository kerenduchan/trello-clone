import { useEffect, useRef, useState } from 'react'
import { useForm } from '../../customHooks/useForm'
import { useKeyDownListener } from '../../customHooks/useKeyDownListener'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'

export function EditableTitle({ title, onChange }) {
    const [showForm, setShowForm] = useState(false)
    const [draft, handleChange, setDraft] = useForm({ title })
    const textareaRef = useRef(null)
    const elRef = useRef(null)

    useClickedOutListener([elRef, textareaRef], onSubmit)
    useKeyDownListener(['Escape'], onCancel)

    useEffect(() => {
        if (showForm) {
            textareaRef.current.select()
        }
    }, [showForm])

    useEffect(() => {
        setShowForm(false)
        setDraft({ title })
    }, [title])

    function onSubmit(e) {
        if (e) e.preventDefault()
        onChange(draft.title)
        setShowForm(false)
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    function onTitleClick() {
        setShowForm(true)
    }

    function onCancel() {
        setDraft({ title })
        setShowForm(false)
    }

    return (
        <div className="editable-title" ref={elRef}>
            <span className="title" onClick={() => onTitleClick()}>
                {/* using draft.title for auto-resize of textarea in grid */}
                {draft.title}
            </span>
            {showForm && (
                <form onSubmit={onSubmit}>
                    {/* using a textarea and not an input for more robust styling */}
                    <textarea
                        autoFocus
                        rows="1"
                        ref={textareaRef}
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        value={draft.title}
                    />
                </form>
            )}
        </div>
    )
}
