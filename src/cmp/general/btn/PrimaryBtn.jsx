import { forwardRef } from 'react'

export const PrimaryBtn = forwardRef(function PrimaryBtn(props, ref) {
    const { text, className, onClick } = props
    return (
        <button
            ref={ref}
            className={`primary-btn ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
})
