import { useEffect, useRef } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import {
    deleteChecklistItem,
    updateChecklistItem,
} from '../../../store/actions/board.actions'
import { ChecklistItemActionsMenu } from './ChecklistItemActionsMenu'
import { Icon } from '../../general/Icon'

export function ChecklistItemEditForm({ hierarchy, checklist, item, onClose }) {
    const textareaRef = useRef(null)
    const [draft, handleChange] = useForm({ title: item.title })
    const actionsMenu = usePopoverState()

    useEffect(() => {
        textareaRef.current.select()
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        if (draft.title.length === 0) {
            deleteChecklistItem(hierarchy, checklist, item)
        } else {
            updateChecklistItem(hierarchy, checklist, item, {
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
        <>
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
                <button className="btn-primary btn-save">Save</button>

                <button
                    type="button"
                    className="btn-square btn-close"
                    onClick={onClose}
                >
                    <Icon type="close" />
                </button>

                <button
                    type="button"
                    className="btn-square btn-more"
                    {...actionsMenu.triggerAndTarget}
                >
                    <Icon type="more" />
                </button>
            </form>

            {/* Actions menu */}
            <ChecklistItemActionsMenu
                hierarchy={hierarchy}
                checklist={checklist}
                item={item}
                popoverState={actionsMenu}
            />
        </>
    )
}
