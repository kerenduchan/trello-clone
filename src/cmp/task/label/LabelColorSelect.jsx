export function LabelColorSelect({ labelColors, selected, onSelect }) {
    return (
        <div className="label-color-select">
            <div className="options">
                {labelColors.map((labelColor) => (
                    <div
                        key={labelColor._id}
                        className={`option-container ${
                            selected?._id === labelColor._id ? 'selected' : ''
                        }`}
                        onClick={() => onSelect(labelColor)}
                    >
                        <div
                            className="option"
                            style={{ backgroundColor: labelColor.color }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
