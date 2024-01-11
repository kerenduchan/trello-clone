import { useRef, useEffect } from 'react'
import { updateTaskAttachment } from '../../../store/actions/board.actions'
import { useForm } from '../../../customHooks/useForm'
import { PopoverMenu } from '../../general/PopoverMenu'

export function TaskAttachmentEdit({ popoverState, hierarchy, attachment }) {
    const inputRef = useRef(null)
    const [draft, handleChange] = useForm({ ...attachment })

    useEffect(() => {
        inputRef.current.select()
    }, [])

    function onSubmit(e) {
        e.preventDefault()
        updateTaskAttachment(hierarchy, draft)
        popoverState.onClose()
    }

    return (
        <PopoverMenu
            className="task-attachment-edit"
            title="Edit attachment"
            {...popoverState.popover}
        >
            <h5>Link name</h5>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    name="title"
                    autoFocus
                    value={draft.title}
                    onChange={handleChange}
                />
                <button className="btn-primary btn-update">Update</button>
            </form>
        </PopoverMenu>
    )
}
