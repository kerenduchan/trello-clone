import { useState, useEffect } from 'react'
import { utilService } from '../../services/util.service'
import { createTask } from '../../store/actions/board.actions'
import { TaskList } from '../task/TaskList'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { Draggable, Droppable } from 'react-beautiful-dnd'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group }) {
    const [taskCreateFormPosition, setTaskCreateFormPosition] = useState(null)
    const [index, setIndex] = useState(null)

    useEffect(() => {
        // determine the index of the task in the group
        setIndex(
            utilService.getIdxById(
                board.groups.filter((group) => !group.archivedAt),
                group._id
            )
        )
    }, [board, group])

    function onShowTaskCreateForm(position) {
        setTaskCreateFormPosition(position)
    }

    async function onCreateTask(board, group, task, position) {
        try {
            createTask(board, group, task, position)
            setTaskCreateFormPosition((prev) => prev + 1)
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    if (index === null) return <></>

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
