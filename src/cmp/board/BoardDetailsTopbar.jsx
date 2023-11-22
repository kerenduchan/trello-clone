import { useState } from 'react'
import { buildClassName } from '../../util'
import { saveBoard } from '../../store/actions/board.actions'
import { TitleEditForm } from '../general/TitleEditForm'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'

export function BoardDetailsTopbar({ board }) {
    const [showForm, setShowForm] = useState(false)

    function onTitleClick() {
        setShowForm(true)
    }

    function onStarClick() {
        saveBoard({ ...board, isStarred: !board.isStarred })
    }

    function onSubmit(draft) {
        board.title = draft.title
        setShowForm(false)
        saveBoard({ ...board, ...draft })
    }

    return (
        <div className="board-details-topbar">
            <div className={buildClassName('title', showForm ? ' edit' : '')}>
                <h1 onClick={onTitleClick}>{board.title}</h1>
                {showForm && (
                    <TitleEditForm title={board.title} onSubmit={onSubmit} />
                )}
            </div>
            <SquareIconBtn icon="star" onClick={onStarClick} />
        </div>
    )
}
