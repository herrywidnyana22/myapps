import { db } from "@/config/firebase";
import { uploadToCloudinary } from "./imageService";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const createUpdateTransaction = async(
    transactionData: Partial<TransactionType>
): Promise<ResponseType>=>{
    try {
        const { id, type, walletId, amount, image } = transactionData
        
        if(!amount || amount <= 0 || !walletId || !type){
            return{
                success: false,
                msg: "Invalid transaction data"
            }
        }

        if(id){
            //TODO: update realted exist transaction
        } else {
            let action = await updateWalletIfNewTransaction(
                walletId!,
                Number(amount),
                type
            )
            
            if(!action.success) return action
        }

        if(image){
            const imageUploadAction = await uploadToCloudinary(image, "transactions")

            if(!imageUploadAction.success){
                
                return{
                    success: false,
                    msg: imageUploadAction.msg || "Failed to upload image...!"
                }
            }

            transactionData.image = imageUploadAction.data
        }


        const getTransactionID = id
            ? doc(db, "transactions", id)
            : doc(collection(db, "transactions"))

        
        await setDoc(getTransactionID, transactionData,{
            merge: true
        })

        return{
            success: true,
            data:{
                ...transactionData,
                id: getTransactionID.id
            }
        }
    } catch (error: any) {
        console.log("Error", error.message)
        return {
            success: false,
            msg: error.message
        }
    }
}

const updateWalletIfNewTransaction = async (
    walletId: string,
    amount: number,
    type: TransactionType['type']
) =>{
    try {
        const getWalletId = doc(db, "wallets", walletId)
        const getWalletDataById = await getDoc(getWalletId)

        if(!getWalletDataById.exists()){
            return{
                success: false,
                msg: "Wallet not found...!"
            }
        }

        const walletData = getWalletDataById.data() as WalletType
        
        if(type === "expense" && walletData.amount! - amount < 0){
            return{
                success: false,
                msg: "Selected wallet don't have enough balance...!"
            }
        }

        const updatedField = type === "income" 
            ? "totalIncome"
            : "totalExpenses"

        const updatedWalletAmount = type === "income"
            ? Number(walletData.amount) + amount
            : Number(walletData.amount) - amount
        
        const updatedTotalAmount = type === "income"
            ? Number(walletData.totalIncome) + amount
            : Number(walletData.totalExpenses) + amount

        await updateDoc(getWalletId,{
            amount: updatedWalletAmount,
            [updatedField]: updatedTotalAmount
        })
        return{
            success: true,
        }
    } catch (error: any) {
        return {
            success: false,
            msg: error.message
        }
    }
}