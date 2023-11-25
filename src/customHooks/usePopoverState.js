import { useState } from 'react'
import { useToggle } from './useToggle'

export function usePopoverState() {
    const [show, toggleShow, setShow] = useToggle()
    const [el, setEl] = useState(null)

    function onClose() {
        return setShow(false)
    }

    return {
        show,
        onClose,
        trigger: { ref: setEl, onClick: toggleShow },
        popover: { refEl: el, onClose, show },
    }
}
