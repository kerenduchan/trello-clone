import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { buildClassName } from '../../util'

export function Popover({ refEl, className, onClose, children }) {
    const wrapperEl = useRef(null)
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

    const mouseDownListener = useCallback((e) => {
        if (
            wrapperEl.current &&
            !wrapperEl.current.contains(e.target) &&
            !refEl.contains(e.target)
        ) {
            // clicked outside of popover
            // and not on button that opened the popover
            onClose()
        }
    })

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownListener)

        return () => {
            document.removeEventListener('mousedown', mouseDownListener)
        }
    })

    return createPortal(
        <div className="popover-wrapper" ref={wrapperEl}>
            <div
                className={buildClassName('popover', className)}
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