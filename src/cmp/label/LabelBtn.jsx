import { forwardRef } from 'react'

export const LabelBtn = forwardRef(function LabelBtn(props, ref) {
    const { label, size = 'lg', onClick } = props
    return (
        <div className={`label-btn-container ${size}`} onClick={onClick}>
            <button
                ref={ref}
                className={`label-btn ${size}`}
                style={{ backgroundColor: label.color }}
            >
                <span className="title">{label.title}</span>
            </button>
            <div className="overlay" />
        </div>
    )
})
