import { Icon } from './Icon'

export function ImgSelect({ images, selectedImg, onClick }) {
    return (
        <ul className="img-select">
            {images.map((img) => (
                <li
                    key={img}
                    className={selectedImg === img ? 'selected' : ''}
                    style={{ backgroundImage: `url(${img}?w=400)` }}
                    onClick={() => onClick(img)}
                >
                    <div className="overlay"></div>
                    <Icon type="check" />
                </li>
            ))}
        </ul>
    )
}
