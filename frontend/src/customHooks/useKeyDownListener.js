import { useCallback } from 'react'
import { useEffect } from 'react'

export function useKeyDownListener(keys, onKeyDown) {
    useEffect(() => {
        document.addEventListener('keydown', f)

        return () => {
            document.removeEventListener('keydown', f)
        }
    })

    const f = useCallback((e) => {
        if (keys.includes(e.key)) {
            onKeyDown()
        }
    })
}
