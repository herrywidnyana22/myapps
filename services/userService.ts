import { db } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadToCloudinary } from "./imageService";

export const updateUser = async (
    uid: string,
    updateData: UserDataType
): Promise<ResponseType> =>{
    try {
        if(updateData.image && updateData?.image?.uri){
            const imageUploadAction = await uploadToCloudinary(updateData.image, "users")

            if(!imageUploadAction.success){
                return{
                    success: false,
                    msg: imageUploadAction.msg || "Failed to upload image...!"
                }
            }

            updateData.image = imageUploadAction.data
        }

        const getUserUID = doc(db, "users", uid)
        await updateDoc(getUserUID, updateData)

        return{
            success: true,
            msg: "Updated success...!"
        }
        
    } catch (error: any) {
        console.log({error})
        return{
            success: false,
            msg: error?.message
        }
    }
}