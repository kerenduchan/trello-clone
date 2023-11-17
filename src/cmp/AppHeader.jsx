export function AppHeader({ user }) {
    return (
        <header className="app-header">
            <div className="logo">{'<Krello Logo>'}</div>
            <button className="create-board-btn primary-btn">
                Create Board
            </button>
            <div className="avatar">{'<User Avatar>'}</div>
        </header>
    )
}
