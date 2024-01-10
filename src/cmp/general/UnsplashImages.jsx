import { useEffect, useState } from 'react'
import { createApi } from 'unsplash-js'

const api = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
})

export function UnsplashImages({ onImageClick }) {
    const [images, setImages] = useState(null)

    useEffect(() => {
        loadPhotos()
    }, [])

    async function loadPhotos() {
        try {
            const res = await api.collections.getPhotos({
                collectionId: '317099',
                perPage: 30,
                orientation: 'landscape',
            })
            if (res.errors) {
                throw res.errors
            }
            setImages(res.response.results)
        } catch (err) {
            console.error('failed to get photos from Unsplash', err)
        }
    }

    if (!images) return <></>

    return (
        <div className="unsplash">
            <ul>
                {images.map((image) => (
                    <li key={image.id}>
                        <UnsplashImage
                            image={image}
                            onClick={() => onImageClick(image)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function UnsplashImage({ image, onClick }) {
    const { user, urls } = image

    return (
        <div className="unsplash-image">
            <div
                className="image"
                style={{ backgroundImage: `url(${urls.regular})` }}
                onClick={onClick}
            />
            <a
                className="credit"
                target="_blank"
                href={`https://unsplash.com/@${user.username}`}
            >
                {user.name}
            </a>
        </div>
    )
}
