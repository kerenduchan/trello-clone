import { useEffect, useRef } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { Icon } from '../../general/Icon'
import { useClickedOutListener } from '../../../customHooks/useClickedOutListener'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'

export function ChecklistHeaderEdit({ title, onSave, onClose }) {
    const [draft, handleChange] = useForm({ title })
    const textareaRef = useRef(null)
    const elRef = useRef(null)

    useClickedOutListener([elRef, textareaRef], onSubmit)
    useKeyDownListener(['Escape'], onClose)

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    useEffect(() => {
        textareaRef.current.select()
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        if (!draft.title.length) {
            return
        }
        onSave(draft.title)
        onClose()
    }

    return (
        <div className="checklist-header-edit">
            <form onSubmit={onSubmit}>
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
                <div className="actions">
                    <button className="btn-primary">Save</button>
                    <button
                        className="btn-close"
                        type="button"
                        onClick={onClose}
                    >
                        <Icon type="close" size="md" />
                    </button>
                </div>
            </form>
        </div>
    )
}
