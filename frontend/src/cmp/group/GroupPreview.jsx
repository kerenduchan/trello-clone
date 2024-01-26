import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectDragUpdateInfo } from '../../store/reducers/app.reducer'
import { createTask } from '../../store/actions/task/task.actions'
import { TaskList } from '../task/TaskList'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group, index, isFilterEmpty }) {
    const [taskCreateFormPosition, setTaskCreateFormPosition] = useState(null)
    const dragUpdateInfo = useSelector(selectDragUpdateInfo)

    function onShowTaskCreateForm(position) {
        setTaskCreateFormPosition(position)
    }

    async function onCreateTask(board, group, task, position) {
        try {
            createTask(board, group, position, task)
            setTaskCreateFormPosition((prev) => prev + 1)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    function getDragDestinationIdx(snapshot) {
        if (snapshot.isDraggingOver) {
            return dragUpdateInfo ? dragUpdateInfo.destinationIdx : null
        }
        return null
    }

    return (
        <Draggable draggableId={group._id} index={index}>
            {(draggableProvided) => (
                <div
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                >
                    <Droppable droppableId={group._id} type="task">
                        {(droppableProvided, snapshot) => (
                            <section
                                className={`group-preview ${
                                    snapshot.isDraggingOver
                                        ? 'dragging-over'
                                        : ''
                                }`}
                            >
                                <div {...draggableProvided.dragHandleProps}>
                                    <GroupPreviewHeader
                                        board={board}
                                        group={group}
                                        onTaskCreate={onShowTaskCreateForm}
                                        isFilterEmpty={isFilterEmpty}
                                    />
                                </div>
                                <div
                                    className="task-list"
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    <TaskList
                                        board={board}
                                        group={group}
                                        taskCreateFormPosition={
                                            taskCreateFormPosition
                                        }
                                        dragDestinationIdx={getDragDestinationIdx(
                                            snapshot
                                        )}
                                        onCloseTaskCreateForm={() =>
                                            setTaskCreateFormPosition(null)
                                        }
                                        onCreateTask={onCreateTask}
                                    />
                                    {droppableProvided.placeholder}
                                </div>

                                {taskCreateFormPosition === null && (
                                    <SecondaryBtn
                                        text="Add a card"
                                        icon="add"
                                        className="btn-show-add-form"
                                        onClick={() =>
                                            setTaskCreateFormPosition(
                                                group.tasks.length
                                            )
                                        }
                                    ></SecondaryBtn>
                                )}
                            </section>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}
