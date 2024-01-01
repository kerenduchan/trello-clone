import { Icon } from './Icon'
import { Popover } from './Popover'

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
            className={`popover-menu ${className ? className : ''}`}
            refEl={refEl}
            onClose={onClose}
        >
            <header>
                {onBack && (
                    <button className="btn-square btn-back" onClick={onBack}>
                        <Icon type="back" />
                    </button>
                )}
                <h2>{title}</h2>
                <button className="btn-square btn-close" onClick={onClose}>
                    <Icon type="close" />
                </button>
            </header>
            <div className="content">{children}</div>
        </Popover>
    )
}
