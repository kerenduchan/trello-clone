import { useEffect, useState } from 'react'
import { createApi } from 'unsplash-js'

const api = createApi({
    accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
})

export function UnsplashImages({ query }) {
    const [images, setImages] = useState(null)

    useEffect(() => {
        loadPhotos()
    }, [query])

    async function loadPhotos() {
        try {
            const res = await api.search.getPhotos({
                query,
                orientation: 'landscape',
            })
            if (res.errors) {
                throw res.errors
            }
            setImages(res.response.results)
        } catch (err) {
            console.error('failed to get photos from Unsplash')
        }
    }

    if (!images) return <></>

    return (
        <div className="unsplash">
            <ul>
                {images.map((image) => (
                    <li key={image.id}>
                        <UnsplashImage image={image} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function UnsplashImage({ image }) {
    const { user, urls } = image

    return (
        <div className="unsplash-image">
            <img src={urls.regular} />
            <a target="_blank" href={`https://unsplash.com/@${user.username}`}>
                {user.name}
            </a>
        </div>
    )
}
