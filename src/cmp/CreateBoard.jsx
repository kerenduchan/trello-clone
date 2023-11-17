export function CreateBoard() {
    return (
        <div className="create-board">
            <h2>Create Board</h2>
            <form>
                <label for="title">Board title</label>
                <input id="title" type="text" />
                <button className="primary-btn">Create</button>
            </form>
        </div>
    )
}
