import { useRef } from 'react'

export function BtnFileUpload({ label, onFileSelected }) {
    const inputFileRef = useRef(null)

    function onClick() {
        inputFileRef.current.click()
    }

    async function onChange(e) {
        const files = e.target.files
        if (files.length === 0) return
        onFileSelected(e.target.files[0])
    }

    return (
        <>
            <button
                className="btn-secondary-centered btn-choose-file"
                onClick={onClick}
            >
                {label || 'Choose a file'}
            </button>
            <input
                type="file"
                ref={inputFileRef}
                accept="image/*"
                onChange={onChange}
            />
        </>
    )
}
