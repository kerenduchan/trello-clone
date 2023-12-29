import { useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import {
    createBoardLabel,
    updateBoardLabel,
} from '../../../store/actions/board.actions'
import { boardService } from '../../../services/board.service'
import { LabelColorSelect } from './LabelColorSelect'
import { Icon } from '../../general/Icon'

export function LabelsMenuEdit({ hierarchy, label, onBack, onDelete }) {
    const [selectedLabelColor, setSelectedLabelColor] = useState(label?.color)
    const labelColors = boardService.getLabelColors()

    const isEdit = Boolean(label)

    if (!label) {
        // create
        label = boardService.getEmptyLabel()
    }

    function onRemoveColorClick() {
        setSelectedLabelColor(null)
    }

    const [draft, handleChange] = useForm({ ...label })

    async function onSubmit(e) {
        e.preventDefault()
        try {
            if (isEdit) {
                updateBoardLabel(hierarchy.board, label, { title: draft.title })
            } else {
                const newLabel = {
                    ...label,
                    color: selectedLabelColor.color,
                    colorName: selectedLabelColor.colorName,
                    title: draft.title,
                }

                createBoardLabel(hierarchy.board, newLabel)
            }

            onBack()
        } catch (err) {
            console.error(err)
            // TODO: show an error dialog
        }
    }

    return (
        <div className="labels-menu-edit">
            <div className="preview-container">
                <div
                    className={`preview ${
                        selectedLabelColor ? '' : 'no-label-color'
                    }`}
                    style={{
                        backgroundColor: selectedLabelColor?.color,
                        color: selectedLabelColor?.textColor,
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
                    labelColors={labelColors}
                    selected={selectedLabelColor}
                    onSelect={(lc) => setSelectedLabelColor(lc)}
                />

                <button
                    type="button"
                    className="btn-secondary-centered btn-remove-color"
                    onClick={onRemoveColorClick}
                    disabled={!selectedLabelColor}
                >
                    <Icon type="close" size="xxs"></Icon>
                    Remove color
                </button>

                <hr />

                <div className="actions">
                    <button className="btn-primary btn-save">
                        {isEdit ? 'Save' : 'Create'}
                    </button>

                    {isEdit && (
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
