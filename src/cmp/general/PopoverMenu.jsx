import { Popover } from './Popover'
import { SquareIconBtn } from './btn/SquareIconBtn'

export function PopoverMenu({
    refEl,
    onClose,
    title,
    onBack = null,
    className,
    children,
}) {
    return (
        <Popover
            className={`popover-menu ${className}`}
            refEl={refEl}
            onClose={onClose}
        >
            <header>
                {onBack && <SquareIconBtn onClick={onBack} icon="back" />}
                <h2>{title}</h2>
                <SquareIconBtn onClick={onClose} icon="close" />
            </header>
            <div className="content">{children}</div>
        </Popover>
    )
}
