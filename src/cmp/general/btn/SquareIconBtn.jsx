import { forwardRef } from 'react'
import { Icon } from '../Icon'

export const SquareIconBtn = forwardRef(function SquareIconBtn(props, ref) {
    const { icon, full = false, className, onClick } = props
    return (
        <button
            type="button"
            ref={ref}
            className={`btn-square-icon btn-${icon}${
                className ? ` ${className}` : ''
            }`}
            onClick={onClick}
        >
            <Icon type={icon} full={full}></Icon>
        </button>
    )
})
