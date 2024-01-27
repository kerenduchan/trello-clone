import { useEffect } from 'react'

export function useDocumentTitle(title, dep) {
    useEffect(() => {
        const prevTitle = document.title

        if (!title) return
        document.title = title

        return () => {
            document.title = prevTitle
        }
    }, [dep])
}
