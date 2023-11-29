import { useEffect, useRef, useCallback } from 'react'
import { useForm } from '../../customHooks/useForm'
import { useToggle } from '../../customHooks/useToggle'
import { createGroup } from '../../store/actions/board.actions'
import { boardService } from '../../services/board.service'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function GroupCreate({ board }) {
    const [showForm, toggleShowForm, setShowForm] = useToggle()

    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyGroup()
    )
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
            try {
                createGroup(board, draft)
                setDraft(boardService.getEmptyGroup())
            } catch (err) {
                console.error(err)
                // TODO: show an error dialog
            }
        }
    }

    function onClose() {
        setDraft(boardService.getEmptyGroup())
        setShowForm(false)
    }

    const mouseDownListener = useCallback((e) => {
        if (formEl.current && !formEl.current.contains(e.target)) {
            // clicked outside of form
            onClose()
        }
    })

    return (
        <div className="group-create">
            {showForm ? (
                <form onSubmit={onSubmit} ref={formEl}>
                    <input
                        autoFocus
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter list title..."
                        onChange={handleChange}
                        value={draft.title}
                    />
                    <PrimaryBtn
                        className="add-btn"
                        text="Add list"
                        onClick={onSubmit}
                    />
                    <SquareIconBtn icon="close" onClick={onClose} />
                </form>
            ) : (
                <SecondaryBtn
                    className="group-create-btn"
                    icon="add"
                    text={
                        board.groups.length === 0
                            ? 'Add a list'
                            : 'Add another list'
                    }
                    onClick={toggleShowForm}
                />
            )}
        </div>
    )
}
