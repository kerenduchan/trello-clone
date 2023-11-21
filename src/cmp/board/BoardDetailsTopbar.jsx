import { useState } from 'react'
import { buildClassName } from '../../util'
import { saveBoard } from '../../store/actions/board.actions'
import { TitleEditForm } from '../general/TitleEditForm'

export function BoardDetailsTopbar({ board }) {
    const [showForm, setShowForm] = useState(false)

    function onTitleClick() {
        setShowForm(true)
    }

    async function onSubmit(draft) {
        await saveBoard({ ...board, ...draft })
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
            {showForm && (
                <TitleEditForm title={board.title} onSubmit={onSubmit} />
            )}
        </header>
    )
}
