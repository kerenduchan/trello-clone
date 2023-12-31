import { useEffect, useRef, useState } from 'react'
import { useToggle } from '../../customHooks/useToggle'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'

export function CustomSelect({
    className,
    label,
    options,
    selectedId,
    onSelect,
}) {
    const [showDropdown, toggleShowDropdown, setShowDropdown] = useToggle()
    const [selectedLabel, setSelectedLabel] = useState('')
    const dropdownRef = useRef(null)
    const btnRef = useRef(null)

    useClickedOutListener(dropdownRef, onClickedOutside)

    useEffect(() => {
        setSelectedLabel(getLabel(selectedId))
    }, [options, selectedId])

    function onBtnClick() {
        toggleShowDropdown()
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
        return found ? found.label : ''
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
                <p className="selected-text">{selectedLabel}</p>
            </button>
            <div className="dropdown-content" ref={dropdownRef}>
                {options.map((option) => (
                    <option
                        className={selectedId === option._id ? 'selected' : ''}
                        key={option._id}
                        value={option._id}
                        onClick={onOptionClick}
                    >
                        {option.label}
                    </option>
                ))}
            </div>
        </div>
    )
}
