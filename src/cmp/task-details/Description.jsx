import { Icon } from '../general/Icon'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'

export function Description({ task }) {
    return (
        <div className="task-details-description">
            <Icon type="description" size="md" />
            <h2 className="title">Description</h2>

            {task.description ? (
                <>
                    <SecondaryBtn className="title-btn" text="Edit" />
                    <p className="text">{task.description}</p>
                </>
            ) : (
                <SecondaryBtn
                    className="add-btn"
                    text="Add a more detailed description..."
                />
            )}
        </div>
    )
}
