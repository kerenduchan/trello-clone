import { toggleModal } from '../../store/actions/app.actions'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskLabelsMenu } from './TaskLabelsMenu'

export function TaskDetailsSidebar({ board, task }) {
    function onLabelsClick(e) {
        toggleModal(
            'task-details-sidebar-labels',
            'Labels',
            <TaskLabelsMenu board={board} task={task} />,
            'task-details-sidebar-labels',
            e
        )
    }

    return (
        <div className="task-details-sidebar">
            <section>
                <h3>Suggested</h3>
                <div className="content">
                    <SecondaryBtn icon="member" text="Join" />
                </div>
            </section>

            <section>
                <h3>Add to card</h3>
                <div className="content">
                    <SecondaryBtn icon="member" text="Members" />
                    <SecondaryBtn
                        icon="label"
                        text="Labels"
                        onClick={onLabelsClick}
                    />
                    <SecondaryBtn icon="checklist" text="Checklist" />
                    <SecondaryBtn icon="date" text="Dates" />
                    <SecondaryBtn icon="attachment" text="Attachment" />
                    <SecondaryBtn icon="cover" text="Cover" />
                    <SecondaryBtn icon="customField" text="Custom Fields" />
                </div>
            </section>

            <section>
                <h3>Actions</h3>
                <div className="content">
                    <SecondaryBtn icon="move" text="Move" />
                    <SecondaryBtn icon="copy" text="Copy" />
                    <SecondaryBtn icon="template" text="Make Template" />
                    <SecondaryBtn icon="archive" text="Archive" />
                    <SecondaryBtn icon="share" text="Share" />
                </div>
            </section>
        </div>
    )
}
