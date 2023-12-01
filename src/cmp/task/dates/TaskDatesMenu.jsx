import { PopoverMenu } from '../../general/PopoverMenu'
import { PrimaryBtn } from '../../general/btn/PrimaryBtn'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskDatesMenu({ hierarchy, popoverState }) {
    return (
        <PopoverMenu
            className="task-dates-menu"
            title="Dates"
            {...popoverState.popover}
        >
            <h4>Start date</h4>

            <h4>Due date</h4>

            <PrimaryBtn text="Save" />
            <SecondaryBtn text="Remove" />
        </PopoverMenu>
    )
}
