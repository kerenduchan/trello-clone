import { useEffect, useRef } from 'react'
import { useForm } from '../../../customHooks/useForm'
import {
    deleteChecklistItem,
    updateChecklistItem,
} from '../../../store/actions/board.actions'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { SquareIconBtn } from '../../general/btn/SquareIconBtn'

export function ChecklistItemEditForm({
    board,
    group,
    task,
    checklist,
    item,
    onClose,
}) {
    const textareaRef = useRef(null)
    const [draft, handleChange, setDraft] = useForm({ title: item.title })

    useEffect(() => {
        textareaRef.current.select()
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        if (draft.title.length === 0) {
            deleteChecklistItem(board, group, task, checklist, item)
        } else {
            updateChecklistItem(board, group, task, checklist, item, {
                title: draft.title,
            })
        }
        onClose()
    }

    function onKeyDown(e) {
        if (e.key === 'Enter') {
            onSubmit(e)
        }
    }

    return (
        <form className="checklist-item-edit-form" onSubmit={onSubmit}>
            <textarea
                ref={textareaRef}
                autoFocus
                className="title"
                name="title"
                id="title"
                onChange={handleChange}
                value={draft.title}
                onKeyDown={onKeyDown}
            ></textarea>
            <PrimaryBtn className="save-btn" text="Save" onClick={onSubmit} />
            <SquareIconBtn icon="close" onClick={onClose} />
            <SecondaryBtn
                className="assign-btn"
                icon="add_member"
                text="Assign"
            />
            <SecondaryBtn
                className="due-date-btn"
                icon="date"
                text="Due date"
            />
            <SquareIconBtn icon="mention" />
            <SquareIconBtn icon="emoji" />
            <SquareIconBtn icon="more" />
        </form>
    )
}
