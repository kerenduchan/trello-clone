import { useEffect, useRef } from 'react'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { SquareIconBtn } from '../../general/btn/SquareIconBtn'

export function ChecklistItemEditForm({ title, onClose }) {
    const textareaRef = useRef(null)

    useEffect(() => {
        textareaRef.current.select()
    }, [])

    function onSubmit(e) {
        e.preventDefault()
    }

    return (
        <form className="checklist-item-edit-form" onSubmit={onSubmit}>
            <textarea
                ref={textareaRef}
                autoFocus
                className="title"
                name="title"
                id="title"
            >
                {title}
            </textarea>
            <PrimaryBtn className="save-btn" text="Save" />
            <SquareIconBtn icon="close" onClick={onClose} />
            <SecondaryBtn className="assign-btn" icon="member" text="Assign" />
            <SecondaryBtn
                className="due-date-btn"
                icon="date"
                text="Due date"
            />
            <SquareIconBtn icon="mention" />
            <SquareIconBtn icon="emoji" />
            <SquareIconBtn icon="more" />
        </form>
    )
}
