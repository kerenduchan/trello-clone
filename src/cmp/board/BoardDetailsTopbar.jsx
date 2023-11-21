import { useState } from 'react'
import { buildClassName } from '../../util'
import { saveBoard } from '../../store/actions/board.actions'
import { TitleEditForm } from '../general/TitleEditForm'

export function BoardDetailsTopbar({ board }) {
    const [showForm, setShowForm] = useState(false)

    function onTitleClick() {
        setShowForm(true)
    }

    function onSubmit(draft) {
        board.title = draft.title
        setShowForm(false)
        saveBoard({ ...board, ...draft })
    }

    return (
        <header
            className={buildClassName(
                'board-details-topbar',
                showForm ? ' edit' : ''
            )}
        >
            <h1 onClick={onTitleClick}>{board.title}</h1>
            {showForm && (
                <TitleEditForm title={board.title} onSubmit={onSubmit} />
            )}
        </header>
    )
}
