import { useRef } from 'react'
import {
    setCurChecklist,
    setCurChecklistItem,
} from '../../../store/actions/app.actions'
import { Checklist } from './Checklist'
import { useEffect } from 'react'
import { useCallback } from 'react'

export function ChecklistList({ hierarchy }) {
    const { task } = hierarchy
    const listElRef = useRef()

    useEffect(() => {
        document.addEventListener('mousedown', mouseDownListener)

        return () => {
            document.removeEventListener('mousedown', mouseDownListener)
        }
    })

    const mouseDownListener = useCallback((e) => {
        if (listElRef.current && !listElRef.current.contains(e.target)) {
            // clicked outside of list
            setCurChecklist(null)
            setCurChecklistItem(null)
        }
    })

    return (
        <div className="checklist-list" ref={listElRef}>
            {task.checklists && (
                <ol>
                    {task.checklists.map((checklist) => (
                        <li key={checklist._id}>
                            <Checklist
                                hierarchy={hierarchy}
                                checklist={checklist}
                            />
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}
