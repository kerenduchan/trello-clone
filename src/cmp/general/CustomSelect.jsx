import { useEffect, useRef, useState } from 'react'
import { useToggle } from '../../customHooks/useToggle'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'

export function CustomSelect({
    className,
    label,
    options,
    selectedId,
    onSelect,
    textWhenNoOptions,
}) {
    const [showDropdown, toggleShowDropdown, setShowDropdown] = useToggle()
    const [selectedLabel, setSelectedLabel] = useState('')
    const [highlightedId, setHighlightedId] = useState(selectedId)
    const dropdownRef = useRef(null)
    const btnRef = useRef(null)

    useClickedOutListener(dropdownRef, onClickedOutside)

    useEffect(() => {
        setSelectedLabel(getLabel(selectedId))
    }, [options, selectedId])

    function onBtnClick() {
        if (options?.length) {
            setHighlightedId(selectedId)
            toggleShowDropdown()
        }
    }

    function onOptionClick(e) {
        setShowDropdown(false)
        onSelect(e.target.value)
    }

    function onClickedOutside(e) {
        if (!btnRef.current.contains(e.target)) {
            setShowDropdown(false)
        }
    }

    function getLabel(id) {
        const found = options.find((o) => o._id === id)
        return found ? found.label : null
    }

    function onMouseEnterOption(e) {
        setHighlightedId(e.target.value)
    }

    return (
        <div
            className={`custom-select ${className ? className : ''} ${
                showDropdown ? 'show-dropdown' : ''
            }`}
        >
            <button
                className="btn-custom-select"
                ref={btnRef}
                onClick={onBtnClick}
            >
                <h4>{label}</h4>
                <p
                    className={`selected-text ${
                        selectedLabel ? '' : 'no-options'
                    }`}
                >
                    {selectedLabel || textWhenNoOptions}
                </p>
            </button>
            <div className="dropdown-content" ref={dropdownRef}>
                {options.map((option) => (
                    <option
                        className={
                            highlightedId === option._id ? 'highlighted' : ''
                        }
                        key={option._id}
                        value={option._id}
                        onClick={onOptionClick}
                        onMouseEnter={onMouseEnterOption}
                    >
                        {option.label}
                    </option>
                ))}
            </div>
        </div>
    )
}
