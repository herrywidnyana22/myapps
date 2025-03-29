import { ResponseType, WalletType } from "@/types";
import { uploadToCloudinary } from "./imageService";
import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where, writeBatch } from "firebase/firestore";

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

        const getWalletID = wallets?.id 
            ? doc(db, "wallets", wallets?.id) 
            : doc(collection(db, "wallets"))
        
        await setDoc(getWalletID, walletToSave,{
            merge: true
        })
        
        return{
            success: true,
            data: {
                ...walletToSave, 
                id: getWalletID.id
            }
        }
    } catch (error: any) {
        return{
            success: false,
            msg: error.message
        }
    }
}

export const deleteWallet = async(walletID: string): Promise<ResponseType> => {
    try {
        
        const getWalletID = doc(db, "wallets", walletID)
        await deleteDoc(getWalletID)

        deleteTransactionByWalletId(walletID)

        return{
            success: true,
            msg: "Wallet deleted successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            msg: error.message
        }
    }
}

export const deleteTransactionByWalletId = async(walletID: string): Promise<ResponseType> => {
    try {

        let hasTransaction = true

        while(hasTransaction){
            const transactionQuery = query(
                collection(db, "transactions"),
                where("walletId", "==", walletID)
            )

            const transactionOnWallet = await getDocs(transactionQuery)

            if(transactionOnWallet.size == 0){
                hasTransaction = false
                break
            }

            const batch = writeBatch(db)

            transactionOnWallet.forEach((transactionDoc) => {
                batch.delete(transactionDoc.ref)
            })

            await batch.commit()
        }


        return{
            success: true,
            msg: "All transactions on this wallet deleted successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            msg: error.message
        }
    }
}