import { forwardRef } from 'react'
import { Icon } from '../Icon'

export const SquareIconBtn = forwardRef(function SquareIconBtn(props, ref) {
    const { icon, full = false, className, onClick } = props
    return (
        <button
            type="button"
            ref={ref}
            className={`square-icon-btn ${icon}-btn${
                className ? ` ${className}` : ''
            }`}
            onClick={onClick}
        >
            <Icon type={icon} full={full}></Icon>
        </button>
    )
})
