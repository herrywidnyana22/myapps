import { db } from "@/config/firebase";
import { uploadToCloudinary } from "./imageService";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createUpdateWallet } from "./walletService";

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
            const getTransactionByID = await getDoc(doc(db, "transactions", id))
            const transactionByID = getTransactionByID.data() as TransactionType
            const isTransactionChanged = 
                transactionByID.type != type ||
                transactionByID.amount != amount ||
                transactionByID.walletId != walletId
            
            if(isTransactionChanged){
                let action = await revertUpdateWallets(transactionByID, Number(amount), type, walletId)

                if (!action.success) return action
            }

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
        
        if(type === "expense" && ((walletData.amount! - amount) < 0)){
            return{
                success: false,
                msg: `Wallet "${getWalletDataById.data()?.name}" don't have enough balance...0!`
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

const revertUpdateWallets = async (
    selectedTransactionID: TransactionType,
    newTransactionAmount: number,
    newTransactionType: TransactionType['type'],
    newWalletId: string
) =>{
    try {
        const getSelectedWalletId = await getDoc(doc(db, "wallets", selectedTransactionID.walletId))
        const selectedWallet = getSelectedWalletId.data() as WalletType

        let getNewWalletId = await getDoc(doc(db, "wallets", newWalletId))
        let newWallet = getNewWalletId.data() as WalletType

        const changedType = selectedTransactionID.type === "income"
            ? "totalIncome"
            : "totalExpenses"

        const changedIncomeExpenses: number = selectedTransactionID.type === "income"
            ? -Number(selectedTransactionID.amount)
            : Number(selectedTransactionID.amount)

        const changedWalletAmount = Number(selectedWallet.amount) + changedIncomeExpenses

        const changedIncomeExpenseAmount = Number(selectedWallet[changedType]) - Number(selectedTransactionID.amount)

        if(newTransactionType === "expense"){
            if(selectedTransactionID.walletId == newWalletId && (changedWalletAmount < newTransactionAmount)){
                return{
                    success: false,
                    msg: `Wallet "${newWallet.name}" don't have enough balance...1!`
                }
            }
        }

        if(newTransactionType === "expense" && (newWallet.amount! < newTransactionAmount)){
            return{
                success: false,
                msg: `Wallet "${newWallet.name}" don't have enough balance...2!`
            }
        }

        await createUpdateWallet({
            id: selectedTransactionID.walletId,
            amount: changedWalletAmount,
            [changedType]: changedIncomeExpenseAmount
        })


        getNewWalletId = await getDoc(doc(db, "wallets", newWalletId))
        newWallet = getNewWalletId.data() as WalletType

        const updatedType = newTransactionType === "income"
            ? "totalIncome"
            : "totalExpenses"
        
        const updatedTransactionAmount: number = newTransactionType === "income"
            ? Number(newTransactionAmount)
            : -Number(newTransactionAmount)

        const newWalletAmount = Number(newWallet.amount) + updatedTransactionAmount
        const newIncomeExpenseAmount = Number(newWallet[updatedType]) + Number(newTransactionAmount)

        await createUpdateWallet({
            id: newWalletId,
            amount: newWalletAmount,
            [updatedType]: newIncomeExpenseAmount
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

export const deleteTransaction = async(
    transactionId: string,
    walletId: string
) =>{
    try {
        const getTransactionID = doc(db, "transactions", transactionId)
        const selectedTransactionID = await getDoc(getTransactionID)

        if(!selectedTransactionID.exists()){
            return {
                success: false,
                msg: "Transaction not found...!"
            }
        }
        
        console.log({transactionId})
        console.log({getTransactionID})

        const selectedTransaction = selectedTransactionID.data() as TransactionType

        const selectedType = selectedTransaction?.type
        const selectedTransactionAmount = selectedTransaction?.amount

        // update amount, total income and expense on related wallet
        const walletSelectedID = await getDoc(doc(db, "wallets", walletId))
        const walletSelected = walletSelectedID.data() as WalletType

        const updatedType = selectedType === "income"
            ? "totalIncome"
            : "totalExpenses"

        const newTransactionAmount = selectedType === "income"
            ? selectedTransactionAmount
            : -selectedTransactionAmount
            
        const newWalletAmount = walletSelected?.amount! - newTransactionAmount

        const newIncomeExpenseAmount = walletSelected[updatedType]! - selectedTransactionAmount

        if(selectedType === "income" && newWalletAmount < 0){
            return {
                success: false,
                msg: "You can't delete this transaction"
            }
        }

        await createUpdateWallet({
            id: walletId,
            amount: newWalletAmount,
            [updatedType]: newIncomeExpenseAmount
        })

        await deleteDoc(getTransactionID)

        return {
            success: true
        }

    } catch (error: any) {
        return {
            success: false,
            msg: error.message
        }
    }
}