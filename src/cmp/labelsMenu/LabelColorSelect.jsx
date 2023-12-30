export function LabelColorSelect({ labelColors, selectedId, onSelect }) {
    return (
        <div className="label-color-select">
            <div className="options">
                {labelColors.map((labelColor) => (
                    <div
                        key={labelColor._id}
                        className={`option-container ${
                            selectedId === labelColor._id ? 'selected' : ''
                        }`}
                        onClick={() => onSelect(labelColor._id)}
                    >
                        <div
                            className="option"
                            style={{ backgroundColor: labelColor.bgColor }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
