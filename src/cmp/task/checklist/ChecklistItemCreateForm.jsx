import { useEffect, useRef } from 'react'
import { boardService } from '../../../services/board.service'
import { addChecklistItem } from '../../../store/actions/board.actions'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
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
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    return (
        <form className="checklist-item-create-form">
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
            <PrimaryBtn text="Add" onClick={onSubmit} />
            <SecondaryBtn
                className="cancel-btn"
                text="Cancel"
                onClick={onClose}
            />
        </form>
    )
}
