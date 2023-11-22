import { SecondaryBtn } from '../general/btn/SecondaryBtn'

export function GroupCreate() {
    return (
        <div className="group-create">
            <SecondaryBtn
                className="group-create-btn"
                icon="add"
                text="Add another list"
            />
        </div>
    )
}
