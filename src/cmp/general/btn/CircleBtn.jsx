import { forwardRef } from 'react'
import { Icon } from '../Icon'

export const CircleBtn = forwardRef(function CircleBtn(props, ref) {
    const { type, className, onClick } = props
    return (
        <button
            ref={ref}
            className={`circle-btn ${type}-btn ${className ? className : ''}`}
            onClick={onClick}
        >
            <Icon type={type} size="sm" />
        </button>
    )
})
