import { useEffect, useRef } from 'react'
import { boardService } from '../../../services/board.service'
import { addChecklistItem } from '../../../store/actions/board.actions'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function ChecklistItemCreateForm({
    hierarchy,
    checklist,
    onClose,
    draft,
    handleChange,
    setDraft,
}) {
    const textareaRef = useRef(null)

    useEffect(() => {
        textareaRef.current.select()
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        if (draft.title.length === 0) {
            return
        }
        addChecklistItem(hierarchy, checklist, draft)
        setDraft(boardService.getEmptyChecklistItem())
        textareaRef.current.select()
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    return (
        <form className="checklist-item-create-form" onSubmit={onSubmit}>
            <textarea
                ref={textareaRef}
                autoFocus
                type="text"
                name="title"
                placeholder="Add an item"
                onChange={handleChange}
                onKeyDown={onKeyDown}
                value={draft.title}
            />
            <button className="btn-primary">Add</button>
            <SecondaryBtn
                className="btn-cancel"
                text="Cancel"
                onClick={onClose}
            />
        </form>
    )
}
