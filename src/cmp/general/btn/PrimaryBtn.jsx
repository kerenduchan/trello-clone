import { forwardRef } from 'react'
import { buildClassName } from '../../../util'

export const PrimaryBtn = forwardRef(function PrimaryBtn(props, ref) {
    const { text, className, onClick } = props
    return (
        <button
            ref={ref}
            className={buildClassName('primary-btn', className)}
            onClick={onClick}
        >
            {text}
        </button>
    )
})
