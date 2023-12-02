import { useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { createTask } from '../../store/actions/board.actions'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'
import { useKeyDownListener } from '../../customHooks/useKeyDownListener'
import { Icon } from '../general/Icon'

export function TaskCreate({ board, group, onClose }) {
    const [draft, handleChange, setDraft] = useForm(boardService.getEmptyTask())
    const formElRef = useRef()
    const inputRef = useRef()

    useClickedOutListener([formElRef], onClose)
    useKeyDownListener(['Escape'], onClose)

    async function onSubmit(e) {
        e.preventDefault()

        if (draft.title.length > 0) {
            try {
                createTask(board, group, draft)
                setDraft(boardService.getEmptyTask())
                inputRef.current.focus()
            } catch (err) {
                console.error(err)
                // TODO: show an error dialog
            }
        }
    }

    return (
        <form className="task-create-form" onSubmit={onSubmit} ref={formElRef}>
            <input
                ref={inputRef}
                autoFocus
                id="title"
                name="title"
                placeholder="Enter a title for this card..."
                onChange={handleChange}
                value={draft.title}
            />
            <button className="btn-primary btn-add">Add card</button>

            <button
                type="button"
                className="btn-square-sharp btn-close"
                onClick={onClose}
            >
                <Icon type="close" />
            </button>
        </form>
    )
}
