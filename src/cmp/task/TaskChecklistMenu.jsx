import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board.service'
import { addChecklist } from '../../store/actions/board.actions'
import { PopoverMenu } from '../general/PopoverMenu'
import { PrimaryBtn } from '../general/btn/PrimaryBtn'

export function TaskChecklistMenu({ board, group, task, checklistMenu }) {
    const [draft, handleChange] = useForm(boardService.getEmptyChecklist())

    async function onSubmit(e) {
        e.preventDefault()
        try {
            addChecklist(board, group, task, draft)
            checklistMenu.onClose()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }
    return (
        <PopoverMenu title="Add checklist" {...checklistMenu.popover}>
            <div className="task-checklist-menu">
                <form onSubmit={onSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        onChange={handleChange}
                        value={draft.title}
                    />
                    <PrimaryBtn className="add-btn" text="Add" />
                </form>
            </div>
        </PopoverMenu>
    )
}
