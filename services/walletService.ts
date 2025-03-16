import { ResponseType, WalletType } from "@/types";
import { uploadToCloudinary } from "./imageService";
import { db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export const createUpdateWallet = async(
    wallets: Partial<WalletType>
):Promise<ResponseType> =>{
    try {
        let walletToSave = {...wallets}

        if(wallets.image){
            const imageUploadAction = await uploadToCloudinary(wallets.image, "wallets")

            if(!imageUploadAction.success){
                return{
                    success: false,
                    msg: imageUploadAction.msg || "Failed to upload wallet icon...!"
                }
            }

            wallets.image = imageUploadAction.data
        }

        if(!wallets?.id){
            walletToSave.created = new Date()
            walletToSave.amount = 0
            walletToSave.totalExpenses = 0
            walletToSave.totalIncome = 0
        }

        const walletRef = wallets?.id 
            ? doc(db, "wallets", wallets?.id) 
            : doc(collection(db, "wallets"))
        
        await setDoc(walletRef, walletToSave,{
            merge: true
        })
        
        return{
            success: true,
            data: {...walletToSave, id: walletRef.id}
        }
    } catch (error: any) {
        console.log("Error create or update wallet", error)
        return{
            success: false,
            msg: error.message
        }
    }
}