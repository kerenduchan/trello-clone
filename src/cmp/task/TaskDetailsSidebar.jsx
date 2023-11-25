import { usePopoverState } from '../../customHooks/usePopoverState'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { TaskLabelsMenu } from './TaskLabelsMenu'
import { PopoverMenu } from '../general/PopoverMenu'
import { TaskDelete } from './TaskDelete'

export function TaskDetailsSidebar({ board, group, task }) {
    const labelsMenu = usePopoverState()
    const deleteTaskMenu = usePopoverState()

    return (
        <>
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
                            {...labelsMenu.trigger}
                            icon="label"
                            text="Labels"
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
                        <SecondaryBtn
                            {...deleteTaskMenu.trigger}
                            icon="archive"
                            text="Archive"
                        />
                        <SecondaryBtn icon="share" text="Share" />
                    </div>
                </section>
            </div>

            {/* Labels menu */}
            {labelsMenu.show && (
                <PopoverMenu title="Labels" {...labelsMenu.popover}>
                    <TaskLabelsMenu
                        board={board}
                        group={group}
                        task={task}
                        onClose={labelsMenu.onClose}
                    />
                </PopoverMenu>
            )}

            {/* Delete task menu */}
            {deleteTaskMenu.show && (
                <PopoverMenu title="Delete Card?" {...deleteTaskMenu.popover}>
                    <TaskDelete
                        board={board}
                        group={group}
                        task={task}
                        onClose={deleteTaskMenu.onClose}
                    />
                </PopoverMenu>
            )}
        </>
    )
}
