import { useEffect, useState } from 'react'
import { useForm } from '../../../customHooks/useForm'
import { updateBoardLabel } from '../../../store/actions/board.actions'
import { LabelColorSelect } from './LabelColorSelect'
import { boardService } from '../../../services/board.service'

export function LabelsMenuEdit({ hierarchy, label, onBack }) {
    const [selectedLabelColor, setSelectedLabelColor] = useState(null)

    const labelColors = boardService.getLabelColors()

    if (!label) {
        // create
        label = boardService.getEmptyLabel()
    }

    const [draft, handleChange] = useForm({ ...label })

    async function onSubmit(e) {
        e.preventDefault()
        try {
            updateBoardLabel(hierarchy.board, label, { title: draft.title })
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

                <button className="btn-primary btn-save">Save</button>
            </form>
        </div>
    )
}
