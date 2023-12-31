import { useCallback } from 'react'
import { useEffect } from 'react'

export function useClickedOutListener(elRefs, onClickOutside) {
    elRefs = Array.isArray(elRefs) ? elRefs : [elRefs]

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownListener)

        return () => {
            document.removeEventListener('mousedown', mouseDownListener)
        }
    })

    const mouseDownListener = useCallback((e) => {
        if (
            elRefs.every(
                (elRef) => elRef.current && !elRef.current.contains(e.target)
            )
        ) {
            // clicked outside of the given elements
            onClickOutside(e)
        }
    })
}
