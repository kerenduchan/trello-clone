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
                        className="btn-show-add-form"
                        onClick={toggleShowTaskCreateForm}
                    ></SecondaryBtn>
                    <SquareIconBtn className="btn-template" icon="template" />
                </>
            )}
        </div>
    )
}
