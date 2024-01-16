import { useEffect } from 'react'
import { useForm } from '../../customHooks/useForm'
import { boardService } from '../../services/board/board.service'
import { labelService } from '../../services/label.service'
import { LabelColorSelect } from './LabelColorSelect'
import { Icon } from '../general/Icon'
export function LabelsMenuEdit({ label, onSave, onDelete }) {
    const [draft, handleChange, setDraft] = useForm(
        label || boardService.getEmptyLabel()
    )

    useEffect(() => {
        // flesh out the color in the draft, based on colorId
        setDraft((prev) => ({
            ...prev,
            color: labelService.getLabelColorById(prev.colorId),
        }))
    }, [draft.colorId])

    function onRemoveColorClick() {
        onColorSelect(labelService.getNoLabelColor()._id)
    }

    function onColorSelect(colorId) {
        setDraft((prev) => ({ ...prev, colorId }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        onSave(draft)
    }

    function isEdit() {
        return label !== null
    }

    function isRemoveColorDisabled() {
        return draft.colorId === labelService.getNoLabelColor()._id
    }

    return (
        <div className="labels-menu-edit">
            <div className="preview-container">
                <div
                    className="preview"
                    style={{
                        backgroundColor: draft.color.bgColor,
                        color: draft.color.textColor,
                    }}
                >
                    {draft.title}
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={handleChange}
                    value={draft.title}
                />

                <h3 className="title">Select a color</h3>
                <LabelColorSelect
                    labelColors={labelService.getLabelColors()}
                    selectedId={draft.colorId}
                    onSelect={onColorSelect}
                />

                <button
                    type="button"
                    className="btn-secondary-centered btn-remove-color"
                    onClick={onRemoveColorClick}
                    disabled={isRemoveColorDisabled()}
                >
                    <Icon type="close" size="xxs"></Icon>
                    Remove color
                </button>

                <hr />

                <div className="actions">
                    <button className="btn-primary btn-save">
                        {isEdit() ? 'Save' : 'Create'}
                    </button>

                    {isEdit() && (
                        <button
                            type="button"
                            className="btn-danger btn-delete"
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
