import { useToggle } from '../../customHooks/useToggle'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
import { SquareIconBtn } from '../general/btn/SquareIconBtn'
import { TaskCreate } from '../task/TaskCreate'

export function GroupPreviewFooter({ board, group }) {
    const [
        showTaskCreateForm,
        toggleShowTaskCreateForm,
        setShowTaskCreateForm,
    ] = useToggle()

    return (
        <div className="group-preview-footer">
            {showTaskCreateForm ? (
                <TaskCreate
                    board={board}
                    group={group}
                    onClose={() => setShowTaskCreateForm(false)}
                />
            ) : (
                <>
                    <SecondaryBtn
                        text="Add a card"
                        icon="add"
                        className="add-btn"
                        onClick={toggleShowTaskCreateForm}
                    ></SecondaryBtn>
                    <SquareIconBtn className="template-btn" icon="template" />
                </>
            )}
        </div>
    )
}
