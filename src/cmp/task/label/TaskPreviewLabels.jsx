import { boardService } from '../../../services/board.service'
import { useToggle } from '../../../customHooks/useToggle'
import { LabelBtn } from '../label/LabelBtn'

export function TaskPreviewLabels({ board, task }) {
    const [isZoomedIn, toggleIsZoomedIn] = useToggle()

    function onLabelClick(e) {
        toggleIsZoomedIn()
        // stop propagation so that the task details won't be opened when
        // a label is clicked in the task preview.
        e.stopPropagation()
    }

    if (!task.labelIds?.length) return <></>

    return (
        <div className="task-preview-labels">
            <ul>
                {task.labelIds.map((labelId) => (
                    <li key={labelId}>
                        <LabelBtn
                            label={boardService.getLabelById(board, labelId)}
                            size={isZoomedIn ? 'md' : 'sm'}
                            onClick={onLabelClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
