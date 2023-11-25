import { Popover } from './Popover'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function PopoverMenu({ refEl, onClose, title, children }) {
    return (
        <Popover className="popover-menu" refEl={refEl} onClose={onClose}>
            <header>
                <h2>{title}</h2>
                <SquareIconBtn onClick={onClose} icon="close" />
            </header>
            <div className="content">{children}</div>
        </Popover>
    )
}
