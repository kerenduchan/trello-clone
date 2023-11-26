import { boardService } from '../../services/board.service'
import { LabelBtn } from '../label/LabelBtn'

export function TaskPreviewLabels({ board, task }) {
    if (!task.labelIds?.length) return <></>

    return (
        <div className="task-preview-labels">
            <ul>
                {task.labelIds.map((labelId) => (
                    <li key={labelId}>
                        <LabelBtn
                            label={boardService.getLabelById(board, labelId)}
                            size="sm"
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}
