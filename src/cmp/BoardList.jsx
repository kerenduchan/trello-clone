import { BoardPreview } from './BoardPreview'

export function BoardList({ boards }) {
    return (
        <ul className="board-list">
            {boards.map((b) => (
                <li key={b._id}>
                    <BoardPreview board={b} />
                </li>
            ))}
        </ul>
    )
}
