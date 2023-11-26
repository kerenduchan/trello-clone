import { useState } from 'react'
import { useToggle } from './useToggle'

export function usePopoverState() {
    const [show, toggleShow, setShow] = useToggle()
    const [el, setEl] = useState(null)

    function onClose() {
        return setShow(false)
    }

    // triggers opening / closing the popover
    const trigger = { onClick: toggleShow }

    // target determines the position of the popover
    const target = { ref: setEl }

    return {
        show,
        onClose,
        trigger,
        target,
        triggerAndTarget: { ...target, ...trigger },
        popover: { refEl: el, onClose, show },
    }
}
