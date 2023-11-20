import { Icon } from '../Icon'

export function CircleBtn({ type, onClick }) {
    return (
        <button className={`circle-btn ${type}-btn`} onClick={onClick}>
            <Icon type={type} size="sm" />
        </button>
    )
}
