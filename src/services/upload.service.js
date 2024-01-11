import axios from 'axios'

export const uploadService = { uploadFile }

const CLOUDINARY_UPLOAD_PRESET = 'yqxglllt'
const CLOUDINARY_CLOUD_NAME = 'ddp0wyac3'

async function uploadFile(file) {
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
            formData
        )

        return response.data.secure_url
    } catch (error) {
        console.error('Error uploading file:', error.message)
        throw error
    }
}
