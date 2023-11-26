import { boardService } from '../../services/board.service'

export function TaskPreviewLabels({ board, task }) {
    if (!task.labelIds?.length) return <></>

    return (
        <div className="task-preview-labels">
            <ul>
                {task.labelIds.map((labelId) => (
                    <li key={labelId}>
                        <div
                            className="label"
                            style={{
                                backgroundColor: boardService.getLabelById(
                                    board,
                                    labelId
                                ).color,
                            }}
                        ></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
