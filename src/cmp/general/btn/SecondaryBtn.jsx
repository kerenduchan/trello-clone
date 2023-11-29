import { forwardRef } from 'react'
import { Icon } from '../Icon'

export const SecondaryBtn = forwardRef(function SecondaryBtn(props, ref) {
    const { icon, text, className, onClick } = props
    return (
        <button
            type="button"
            ref={ref}
            className={`secondary-btn ${className ? ` ${className}` : ''}`}
            onClick={onClick}
        >
            {icon && <Icon type={icon} size="sm"></Icon>}
            <span>{text}</span>
        </button>
    )
})
