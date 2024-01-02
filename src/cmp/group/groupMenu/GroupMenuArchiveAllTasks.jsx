export function GroupMenuArchiveAllTasks({ onArchiveAllTasks }) {
    return (
        <div className="confirmation-menu">
            <p>
                {`This will remove all the cards in this list from the board. To
                view archived cards and bring them back to the board, click
                “Menu” > “Archived Items.”`}
            </p>
            <button className="btn-danger" onClick={onArchiveAllTasks}>
                Archive all
            </button>
        </div>
    )
}
