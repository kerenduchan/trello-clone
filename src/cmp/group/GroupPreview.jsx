import { useState } from 'react'
import { createTask } from '../../store/actions/board.actions'
import { TaskList } from '../task/TaskList'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group }) {
    const [taskCreateFormPosition, setTaskCreateFormPosition] = useState(null)

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

    return (
        <section className="group-preview">
            <GroupPreviewHeader
                board={board}
                group={group}
                onTaskCreate={onShowTaskCreateForm}
            />

            <TaskList
                board={board}
                group={group}
                taskCreateFormPosition={taskCreateFormPosition}
                onCloseTaskCreateForm={() => setTaskCreateFormPosition(null)}
                onCreateTask={onCreateTask}
            />

            {taskCreateFormPosition === null && (
                <SecondaryBtn
                    text="Add a card"
                    icon="add"
                    className="btn-show-add-form"
                    onClick={() =>
                        setTaskCreateFormPosition(group.tasks.length)
                    }
                ></SecondaryBtn>
            )}
        </section>
    )
}
