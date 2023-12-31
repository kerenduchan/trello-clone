import { useRef } from 'react'
import { useToggle } from '../../customHooks/useToggle'
import { useClickedOutListener } from '../../customHooks/useClickedOutListener'

export function CustomSelect({
    className,
    label,
    options,
    selected,
    onSelect,
}) {
    const [showDropdown, toggleShowDropdown, setShowDropdown] = useToggle()
    const dropdownRef = useRef(null)
    const btnRef = useRef(null)

    useClickedOutListener(dropdownRef, onClickedOutside)

    function onBtnClick() {
        toggleShowDropdown()
    }

    function onOptionClick(e) {
        setShowDropdown(false)
        onSelect({
            value: e.target.value,
            text: e.target.innerHTML,
        })
    }

    function onClickedOutside(e) {
        if (!btnRef.current.contains(e.target)) {
            setShowDropdown(false)
        }
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
                <p className="selected-text">{selected?.text}</p>
            </button>
            <div className="dropdown-content" ref={dropdownRef}>
                {options.map((option) => (
                    <option
                        className={
                            selected.value === option.value ? 'selected' : ''
                        }
                        key={option.value}
                        value={option.value}
                        onClick={onOptionClick}
                    >
                        {option.text}
                    </option>
                ))}
            </div>
        </div>
    )
}
