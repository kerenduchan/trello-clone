import { useState } from 'react'
import { useForm } from '../../customHooks/useForm'
import { buildClassName } from '../../util'
import { saveBoard } from '../../store/actions/board.actions'

export function BoardDetailsTopbar({ board }) {
    const [draft, handleChange, setDraft] = useForm({
        ...board,
    })

    const [showForm, setShowForm] = useState(false)

    function onTitleClick() {
        setShowForm(true)
    }

    async function onSubmit(e) {
        e.preventDefault()
        await saveBoard(draft)
        setShowForm(false)
    }

    return (
        <header
            className={buildClassName(
                'board-details-topbar',
                showForm ? ' edit' : ''
            )}
        >
            <h1 onClick={onTitleClick}>{board.title}</h1>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={draft.title}
                    onBlur={onSubmit}
                />
            </form>
        </header>
    )
}
