import { togglePopover } from '../../store/actions/app.actions'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskLabelsMenu } from './TaskLabelsMenu'

export function TaskDetailsSidebar({ board, group, task }) {
    function onLabelsClick(e) {
        togglePopover({
            event: e,
            el: e.currentTarget,
            title: 'List Actions',
            content: <TaskLabelsMenu board={board} group={group} task={task} />,
        })
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
