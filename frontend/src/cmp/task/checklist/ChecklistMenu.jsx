import { useEffect, useRef } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { boardService } from '../../../services/board.service'
import { addChecklist } from '../../../store/actions/task/task.checklist.actions'
import { PopoverMenu } from '../../general/PopoverMenu'

export function ChecklistMenu({ hierarchy, checklistMenu }) {
    const [draft, handleChange] = useForm(boardService.getEmptyChecklist())
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.select()
    }, [])

    async function onSubmit(e) {
        e.preventDefault()
        try {
            addChecklist(hierarchy, draft)
            checklistMenu.onClose()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }
    return (
        <PopoverMenu
            className="checklist-menu"
            title="Add checklist"
            {...checklistMenu.popover}
        >
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    ref={inputRef}
                    autoFocus
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={draft.title}
                />
                <button className="btn-primary btn-add">Add</button>
            </form>
        </PopoverMenu>
    )
}
