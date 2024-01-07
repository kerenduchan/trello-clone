export function BoardMembers({ members }) {
    return (
        <div className="board-members">
            {members.map((member, idx) => (
                <button
                    key={member._id}
                    className="btn-board-member"
                    style={{ zIndex: members.length - idx }}
                >
                    <img src={member.imgUrl} />
                    <div
                        className="overlay"
                        style={{ zIndex: members.length - idx + 1 }}
                    />
                </button>
            ))}
        </div>
    )
}
