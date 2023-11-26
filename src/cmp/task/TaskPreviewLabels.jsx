import { boardService } from '../../services/board.service'
import { LabelBtn } from '../label/LabelBtn'

export function TaskPreviewLabels({ board, task }) {
    if (!task.labelIds?.length) return <></>

    function onLabelClick(e) {
        // stop propagation so that the task details won't be opened when
        // a label is clicked in the task preview.
        e.stopPropagation()
    }

    return (
        <div className="task-preview-labels">
            <ul>
                {task.labelIds.map((labelId) => (
                    <li key={labelId}>
                        <LabelBtn
                            label={boardService.getLabelById(board, labelId)}
                            size="sm"
                            onClick={onLabelClick}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
