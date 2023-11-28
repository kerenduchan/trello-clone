import { useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { addChecklistItem } from '../../store/actions/board.actions'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'

export function ChecklistItemCreateForm({
    board,
    group,
    task,
    checklist,
    onClose,
}) {
    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyChecklistItem()
    )
    const textareaRef = useRef(null)

    function onSubmit(e) {
        e.preventDefault()
        // TODO: prevent a double-submit in case of Enter + blur
        if (draft.title.length === 0) {
            return
        }
        addChecklistItem(board, group, task, checklist, draft)
        setDraft(boardService.getEmptyChecklistItem())
        onClose()
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    return (
        <div className="checklist-item-create-form">
            <textarea
                ref={textareaRef}
                type="text"
                name="title"
                onChange={handleChange}
                onKeyDown={onKeyDown}
                value={draft.title}
                onBlur={onSubmit}
            />
            <PrimaryBtn text="Add" onClick={onSubmit} />
        </div>
    )
}
