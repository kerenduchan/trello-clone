import { useToggle } from '../../customHooks/useToggle'
import { Icon } from '../general/Icon'
import { SecondaryBtn } from '../general/btn/SecondaryBtn'
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

                    <button className="btn-square">
                        <Icon type="template" />
                    </button>
                </>
            )}
        </div>
    )
}
