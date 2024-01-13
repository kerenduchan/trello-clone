import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { useClickedOutListener } from '../../../customHooks/useClickedOutListener'
import { useKeyDownListener } from '../../../customHooks/useKeyDownListener'
import { Checklist } from './Checklist'
import {
    curChecklistChanged,
    curChecklistItemChanged,
} from '../../../store/reducers/app.reducer'

export function ChecklistList({ hierarchy }) {
    const dispatch = useDispatch()
    const { task } = hierarchy
    const listElRef = useRef()
    useClickedOutListener([listElRef], onClose)
    useKeyDownListener(['Escape'], onClose)

    function onClose() {
        dispatch(curChecklistChanged(null))
        dispatch(curChecklistItemChanged(null))
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
