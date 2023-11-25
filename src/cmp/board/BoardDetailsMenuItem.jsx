import { forwardRef } from 'react'
import { Icon } from '../general/Icon'

export const BoardDetailsMenuItem = forwardRef(function BoardDetailsMenuItem(
    props,
    ref
) {
    const { icon, title, onClick } = props
    return (
        <div className="board-details-menu-item" ref={ref} onClick={onClick}>
            <Icon type={icon} />
            <span className="title">{title}</span>
        </div>
    )
})
