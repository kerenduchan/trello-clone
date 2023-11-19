export function TaskDetailsLabels({ labels }) {
    return (
        <section className="task-details-labels">
            {labels && labels.length > 0 && (
                <>
                    <h3>Labels</h3>
                    <ul>
                        {labels.map((label) => (
                            <li key={label._id}>
                                <button
                                    className="label"
                                    style={{ backgroundColor: label.color }}
                                >
                                    {label.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </section>
    )
}
