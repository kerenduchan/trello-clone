import { Icon } from './Icon'

export function SecondaryIconBtn({ type, text, onClick }) {
    console.log(type)
    return (
        <button className="secondary-icon-btn" onClick={onClick}>
            <Icon type={type} size="small"></Icon>
            <span>{text}</span>
        </button>
    )
}
