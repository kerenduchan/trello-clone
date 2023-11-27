import { useEffect, useRef, useCallback } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { updateBoard } from '../../store/actions/board.actions'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function TaskCreate({ board, group, onClose }) {
    const [draft, handleChange, setDraft] = useForm(boardService.getEmptyTask())
    const formEl = useRef()

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownListener)

        return () => {
            document.removeEventListener('mousedown', mouseDownListener)
        }
    })
    
    async function onSubmit(e) {
        e.preventDefault()

        if (draft.title.length > 0) {
            // add the new task to this group in the board
            const boardClone = structuredClone(board)
            const groupClone = boardService.getGroupById(boardClone, group._id)
            groupClone.tasks.push(draft)
            updateBoard(boardClone)
            setDraft(boardService.getEmptyTask())
        }
    }

    const mouseDownListener = useCallback((e) => {
        if (
            formEl.current &&
            !formEl.current.contains(e.target)
        ) {
            // clicked outside of form
            onClose()
        }
    })

    return (
        <form className="task-create-form" onSubmit={onSubmit} ref={formEl}>
            <input
                autoFocus
                id="title"
                name="title"
                placeholder="Enter a title for this card..."
                onChange={handleChange}
                value={draft.title}
            />
            <PrimaryBtn className="add-btn" text="Add card" />
            <SquareIconBtn icon="close" onClick={onClose} />
        </form>
    )
}
