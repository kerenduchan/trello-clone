import { useRef } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board/board.service'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'
import { useKeyDownListener } from '../../customHooks/useKeyDownListener'
import { Icon } from '../general/Icon'

export function TaskCreate({ board, group, position, onCreate, onClose }) {
    const [draft, handleChange, setDraft] = useForm(boardService.getEmptyTask())
    const formElRef = useRef()
    const inputRef = useRef()

    useClickedOutListener([formElRef], onSubmit)
    useKeyDownListener(['Escape'], onClose)

    function onSubmit(e) {
        e.preventDefault()

        if (draft.title.trim().length > 0) {
            onCreate(board, group, draft, position)
            setDraft(boardService.getEmptyTask())
            inputRef.current.focus()
        } else {
            onClose()
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
