import { boardService } from '../../../services/board.service'
import { addChecklistItem } from '../../../store/actions/board.actions'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function ChecklistItemCreateForm({
    board,
    group,
    task,
    checklist,
    onClose,
    draft,
    handleChange,
    setDraft,
}) {
    function onSubmit(e) {
        console.log('on submit')
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
                autoFocus
                type="text"
                name="title"
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
        </div>
    )
}
