import { useEffect, useRef } from 'react'
import { useForm } from '../../customHooks/useForm'

export function TitleEditForm({ title, onSubmit }) {
    const [draft, handleChange] = useForm({ title })

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef && inputRef.current.select()
    }, [])

    function onSubmitInternal(e) {
        e.preventDefault()
        onSubmit(draft)
    }

    return (
        <form onSubmit={onSubmitInternal}>
            <input
                ref={inputRef}
                autoFocus
                type="text"
                name="title"
                onChange={handleChange}
                value={draft.title}
                onBlur={onSubmitInternal}
            />
        </form>
    )
}
