import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'

export function Popover({ refEl, className, onClose, children }) {
    const wrapperEl = useRef(null)
    const refRefEl = useRef(refEl)
    const [popperEl, setPopperEl] = useState(null)
    const { styles, attributes } = usePopper(refEl, popperEl, {
        placement: 'bottom-start',
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, 10],
                },
            },
        ],
    })

    useClickedOutListener([wrapperEl, refRefEl], onClose)

    return createPortal(
        <div className="popover-wrapper" ref={wrapperEl}>
            <div
                className={`popover ${className}`}
                ref={setPopperEl}
                style={styles.popper}
                {...attributes.popper}
            >
                {children}
            </div>
        </div>,
        document.body
    )
}
