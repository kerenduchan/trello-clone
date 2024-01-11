import { useEffect, useState } from 'react'
import { boardService } from '../../../services/board.service'
import { updateTask } from '../../../store/actions/board.actions'
import { PopoverMenu } from '../../general/PopoverMenu'
import { SecondaryBtn } from '../../general/btn/SecondaryBtn'

export function TaskCoverMenu({ hierarchy, popoverState }) {
    const { task } = hierarchy
    const [selectedColor, setSelectedColor] = useState(
        task.cover?.bgColor || null
    )

    useEffect(() => {
        setSelectedColor(task.cover?.bgColor || null)
    }, [task])

    function onColorClick(c) {
        const cover = c._id === selectedColor?._id ? null : { bgColor: c }
        updateTask(hierarchy, { cover })
    }

    function onRemoveCoverClick() {
        updateTask(hierarchy, { cover: null })
    }

    return (
        <PopoverMenu
            className="task-cover-menu"
            title="Cover"
            {...popoverState.popover}
        >
            <h4>Size</h4>

            <SecondaryBtn text="Remove cover" onClick={onRemoveCoverClick} />
            <h4>Colors</h4>
            <ul className="colors">
                {boardService.getCoverColors().map((c) => (
                    <li key={c._id}>
                        <div
                            className={`btn-color ${
                                selectedColor?._id === c._id ? ' selected' : ''
                            }`}
                            style={{ backgroundColor: c.color }}
                            onClick={() => onColorClick(c)}
                        />
                    </li>
                ))}
            </ul>
            <h4>Attachments</h4>

            <SecondaryBtn text="Upload a cover image" />
        </PopoverMenu>
    )
}
