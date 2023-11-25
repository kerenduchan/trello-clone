import { boardService } from '../../services/board.service'

export function TaskDetailsLabels({ board, task }) {
    const labels = boardService.getTaskLabels(board, task)

    return (
        <section className="task-details-labels">
            {labels && labels.length > 0 && (
                <>
                    <h3>Labels</h3>
                    <ul>
                        {labels.map((label) => (
                            <li key={label._id}>
                                <button
                                    className="label-btn"
                                    style={{ backgroundColor: label.color }}
                                >
                                    {label.title}
                                </button>
                                <div className="overlay" />
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    )
}
