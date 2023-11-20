import { buildClassName } from '../../../util'

export function PrimaryBtn({ text, className, onClick }) {
    return (
        <button
            className={buildClassName('primary-btn', className)}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
