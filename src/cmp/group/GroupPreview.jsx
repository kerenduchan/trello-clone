import { useState } from 'react'
import { TaskList } from '../task/TaskList'
import { GroupPreviewHeader } from './GroupPreviewHeader'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'

// Represents a group of tasks (a list in the UI) in a board
export function GroupPreview({ board, group }) {
    const [taskCreateFormPosition, setTaskCreateFormPosition] = useState(null)

    function onShowTaskCreateForm(position) {
        setTaskCreateFormPosition(position)
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
