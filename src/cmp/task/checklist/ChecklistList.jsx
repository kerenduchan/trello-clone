import { useRef } from 'react'
import {
    setCurChecklist,
    setCurChecklistItem,
} from '../../../store/actions/app.actions'
import { useClickedOutListener } from '../../../customHooks/useClickedOutListener'
import { Checklist } from './Checklist'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'

export function ChecklistList({ hierarchy }) {
    const { task } = hierarchy
    const listElRef = useRef()
    useClickedOutListener([listElRef], onClose)
    useKeyDownListener(['Escape'], onClose)

    function onClose() {
        setCurChecklist(null)
        setCurChecklistItem(null)
    }

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
