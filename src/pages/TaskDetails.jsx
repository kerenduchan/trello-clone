import { useNavigate, useParams } from 'react-router'

export function TaskDetails({ task }) {
    const navigate = useNavigate()
    const params = useParams()

    function onClose() {
        console.log('onClose')
        navigate(`/b/${params.boardId}`)
    }

    return (
        <div className="task-details-bg" onClick={onClose}>
            <div className="task-details" onClick={(e) => e.stopPropagation()}>
                <button className="circle-btn close-btn" onClick={onClose}>
                    <img src="images/close.svg" alt="close" />
                </button>
                <h1 className="title">{task.title}</h1>
            </div>
        </div>
    )
}
