import { buildClassName } from '../../util'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function Popover({ title, className, onClose, children }) {
    return (
        <div className={buildClassName('popover', className)}>
            <header>
                <h2>{title}</h2>
                <SquareIconBtn onClick={onClose} icon="close" />
            </header>
            <div className="content">{children}</div>
        </div>
    )
}
