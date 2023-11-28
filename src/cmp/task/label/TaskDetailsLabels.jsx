import { boardService } from '../../../services/board.service'
import { usePopoverState } from '../../../customHooks/usePopoverState'
import { LabelBtn } from '../label/LabelBtn'
import { TaskLabelsMenu } from './TaskLabelsMenu'

export function TaskDetailsLabels({ board, group, task }) {
    const labels = boardService.getTaskLabels(board, task)
    const labelsMenu = usePopoverState()

    return (
        <>
            <section className="task-details-labels">
                {!!labels?.length && (
                    <>
                        <h3>Labels</h3>
                        <ul {...labelsMenu.target}>
                            {labels.map((label) => (
                                <li key={label._id}>
                                    <LabelBtn
                                        label={label}
                                        {...labelsMenu.trigger}
                                    />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </section>

            {/* Labels menu */}
            {labelsMenu.show && (
                <TaskLabelsMenu
                    board={board}
                    group={group}
                    task={task}
                    labelsMenu={labelsMenu}
                />
            )}
        </>
    )
}
