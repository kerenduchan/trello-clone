import { PrimaryBtn } from './PrimaryBtn'

export function AppHeader({ user }) {
    return (
        <header className="app-header">
            <div className="logo">{'<Krello Logo>'}</div>
            <PrimaryBtn text="Create Board"></PrimaryBtn>
            <div className="avatar">{'<User Avatar>'}</div>
        </header>
    )
}
