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
                }}
            >
                <span
                    className="title"
                    style={{ color: label.color.textColor }}
                >
                    {label.title}
                </span>
            </button>
            <div className="overlay" />
        </div>
    )
})
