import { useRef } from 'react'
import { Droppable } from 'react-beautiful-dnd'
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
                <Droppable droppableId={task._id} type="checklist">
                    {(provided) => (
                        <div
                            className="droppable-checklist-list"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <ol>
                                {task.checklists.map((checklist, index) => (
                                    <li key={checklist._id}>
                                        <Checklist
                                            hierarchy={hierarchy}
                                            checklist={checklist}
                                            index={index}
                                        />
                                    </li>
                                ))}
                            </ol>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            )}
        </div>
    )
}
