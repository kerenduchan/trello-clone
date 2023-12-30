import { forwardRef } from 'react'

export const LabelBtn = forwardRef(function LabelBtn(props, ref) {
    const { label, size = 'lg', onClick } = props
    return (
        <div className={`container-btn-label ${size}`} onClick={onClick}>
            <button
                ref={ref}
                className={`btn-label ${size}`}
                style={{
                    backgroundColor: label.color.bgColor,
                    color: label.color.textColor,
                }}
            >
                <span className="title">{label.title}</span>
            </button>
            <div className="overlay" />
        </div>
    )
})
