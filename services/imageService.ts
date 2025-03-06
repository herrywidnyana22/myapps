import { CLOUDINARY_CLOUD_URL, CLOUDINARY_UPLOAD_PRESET } from "@/constants"
import { ResponseType } from "@/types"

import axios from "axios"

export const uploadToCloudinary = async(
    file: {uri?: string} | string,
    folder: string
): Promise<ResponseType> =>{
    try {
        if(!file){
            return {
                success: true,
                data: null
            }
        }
        if(typeof file == 'string'){
            return{
                success: true,
                data: file
            }
        }

        if(file && file.uri){
            const formData = new FormData()
            formData.append("file", {
                uri: file?.uri,
                type: "image/jpeg",
                name: file?.uri?.split("/").pop() || "file.jpg"
            } as any)

            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
            formData.append("folder", folder)

            const action = await axios.post(CLOUDINARY_CLOUD_URL, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })

            return{
                success: true,
                data: action?.data?.data?.secure_url
            }
        }
        return{
            success: true,
        }

    } catch (error: any) {
        console.error("Error upload: ", error)
        return {
            success: false,
            msg: error.message || "Failed to upload file..."
        }
    }
}

export const getAvatar = (file: any) =>{
    if(file && typeof file == 'string') return file
    if(file && typeof file == 'object') return file.uri

    return require('@/assets/images/blankAvatar.png')
}

export const getFilePath = (file: any) =>{
    if(file && typeof file == 'string') return file
    if(file && typeof file == 'object') return file.uri

    return null
}