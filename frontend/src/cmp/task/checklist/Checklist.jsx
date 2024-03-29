import { useSelector, useDispatch } from 'react-redux'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
    curChecklistChanged,
    selectChecklistId,
} from '../../../store/reducers/app.reducer'
import { boardService } from '../../../services/board/board.service'
import {
    deleteChecklist,
    updateChecklist,
} from '../../../store/actions/task/task.checklist.actions'
import { useForm } from '../../../customHooks/useForm'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'
import { ChecklistItem } from './ChecklistItem'
import { ProgressBar } from '../../general/ProgressBar'
import { ChecklistItemCreateForm } from './ChecklistItemCreateForm'
import { ChecklistHeader } from './ChecklistHeader'

export function Checklist({ hierarchy, checklist, index }) {
    const dispatch = useDispatch()
    const curChecklistId = useSelector(selectChecklistId)

    // When create checklist item form is closed, need to retain draft
    const [draft, handleChange, setDraft] = useForm(
        boardService.getEmptyChecklistItem()
    )

    function onDeleteChecklist() {
        try {
            deleteChecklist(hierarchy, checklist)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function onUpdateTitle(title) {
        updateChecklist(hierarchy, { ...checklist, title })
    }

    function onShowForm() {
        dispatch(curChecklistChanged(checklist._id))
    }

    function onHideForm() {
        dispatch(curChecklistChanged(null))
    }

    function isShowForm() {
        return curChecklistId === checklist._id
    }

    return (
        <Draggable draggableId={checklist._id} index={index}>
            {(provided) => (
                <div
                    className="checklist"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Droppable
                        droppableId={checklist._id}
                        type="checklist-item"
                    >
                        {(provided) => (
                            <>
                                <ChecklistHeader
                                    title={checklist.title}
                                    onDelete={onDeleteChecklist}
                                    onUpdateTitle={onUpdateTitle}
                                />

                                <div
                                    className="content"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <ProgressBar
                                        percent={boardService.getChecklistPercent(
                                            checklist
                                        )}
                                    />

                                    <ol className="items">
                                        {checklist.items.map((item, idx) => (
                                            <li key={item._id}>
                                                <ChecklistItem
                                                    hierarchy={hierarchy}
                                                    checklist={checklist}
                                                    item={item}
                                                    index={idx}
                                                />
                                            </li>
                                        ))}
                                        {provided.placeholder}
                                    </ol>

                                    {isShowForm() ? (
                                        <ChecklistItemCreateForm
                                            hierarchy={hierarchy}
                                            checklist={checklist}
                                            onClose={onHideForm}
                                            draft={draft}
                                            handleChange={handleChange}
                                            setDraft={setDraft}
                                        />
                                    ) : (
                                        <div className="add-item">
                                            <SecondaryBtn
                                                className="btn-add"
                                                text="Add an item"
                                                onClick={onShowForm}
                                            />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}
