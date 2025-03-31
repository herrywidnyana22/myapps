import { db } from "@/config/firebase";
import { spacingX } from "@/styles/themes";
import { horizontalScale } from "@/utils/style";
import { createUpdateWallet } from "./walletService";
import { uploadToCloudinary } from "./imageService";
import { getLast12Months, getLast7Days, getYearsRange } from "@/utils/common";
import { ResponseType, TransactionType, TransactionWithWalletType, WalletType } from "@/types";
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import React from "react";
import CustomText from "@/components/CustomText";
import { toLabelNumber } from "@/utils/idrFormater";

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
        console.log("Error disinikah?")
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
): Promise<ResponseType> =>{
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
): Promise<ResponseType> =>{
    try {
        console.log("TERIGGER REVERT")
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


export const getWeeklyData = async(
    uid: string,
    walletIds: string[],
    colors: any,
): Promise<ResponseType> =>{
    try {
        const today = new Date();
        const aWeekAgo = new Date(today);
        aWeekAgo.setDate(today.getDate() - 7);

        
        let transactionsQuery = query(
            collection(db, "transactions"),
            where("uid", "==", uid),
            where("date", ">=", Timestamp.fromDate(aWeekAgo)),
            where("date", "<=", Timestamp.fromDate(today)),
            orderBy("date", "desc")
        )

        if (walletIds.length > 0) {
            transactionsQuery = query(
                transactionsQuery,
                where("walletId", "in", walletIds)  // "in" for multiple walletIds
            )
        }

        const transactionDocs = await getDocs(transactionsQuery)
        const weeklyRange = getLast7Days()
        const transactionData: TransactionWithWalletType[] = []

        const walletsQuery = collection(db, "wallets")
        const walletDocs = await getDocs(walletsQuery)
        const walletMap = new Map()
        walletDocs.forEach((doc) => walletMap.set(doc.id, doc.data().name))

        transactionDocs.forEach((doc) => {
            const transaction = doc.data() as TransactionWithWalletType;
            transaction.id = doc.id

            transaction.walletName = walletMap.get(transaction.walletId) || "Unknown Wallet"

            transactionData.push(transaction)

            // Convert Firestore Timestamp to date string (YYYY-MM-DD)
            const transactionDate = (transaction.date as Timestamp)
                .toDate()
                .toISOString()
                .split("T")[0]

            const dayData = weeklyRange.find((day) => day.date === transactionDate)
            if (!dayData) return

            if (transaction.type === "income") {
                dayData.income += transaction.amount
            } else {
                dayData.expense += transaction.amount
            }
        })

        // create bar chart params (income 5 n expense 2)
        const statData = weeklyRange.flatMap((day) =>[
            {
                value: day.income,
                label: day.day,
                spacing: horizontalScale(4),
                labelWidth: horizontalScale(45),
                frontColor: colors.primary,
                topLabelComponent: () => 
                    React.createElement(
                        CustomText, 
                        { size: 8, color: colors.neutral200, style:{marginBottom:spacingX._3} }, 
                        String(toLabelNumber(day.income))
                    ),
            }, {
                value: day.expense,
                frontColor: colors.rose,
                topLabelComponent: () => 
                    React.createElement(
                        CustomText, 
                        { size: 8, color: colors.neutral200, style:{marginBottom:spacingX._3} }, 
                        String(toLabelNumber(day.expense))
                    ),
            },
        ])

        return{
            success: true,
            data: {
                statData,
                transactionData
            }
        }
    } catch (error:any) {
        console.log({error})
        return {
            success: false,
            msg: error.message
        }
        
    }
}

export const getMonthlyData = async(
    uid: string,
    walletIds: string[],
    colors: any
): Promise<ResponseType> =>{
    try {
        const today = new Date();
        const aYearAgo = new Date(today);
        aYearAgo.setMonth(today.getMonth() - 12);

        let transactionsQuery = query(
            collection(db, "transactions"),
            where("uid", "==", uid),
            where("date", ">=", Timestamp.fromDate(aYearAgo)),
            where("date", "<=", Timestamp.fromDate(today)),
            orderBy("date", "desc")
        )

        if (walletIds.length > 0) {
            transactionsQuery = query(
                transactionsQuery,
                where("walletId", "in", walletIds)  // "in" for multiple walletIds
            )
        }

        const transactionDocs = await getDocs(transactionsQuery)
        const monthlyRange = getLast12Months()
        const transactionData: TransactionWithWalletType[] = []

        const walletsQuery = collection(db, "wallets")
        const walletDocs = await getDocs(walletsQuery)
        const walletMap = new Map()
        walletDocs.forEach((doc) => walletMap.set(doc.id, doc.data().name))
        transactionDocs.forEach((doc) => {
            const transaction = doc.data() as TransactionWithWalletType
            transaction.id = doc.id

            transaction.walletName = walletMap.get(transaction.walletId) || "Unknown Wallet"
    
            transactionData.push(transaction)

            // Convert Firestore Timestamp to date string (YYYY-MM-DD)
            const transactionDate = (transaction.date as Timestamp).toDate()
            const shortYear = transactionDate.getFullYear().toString().slice(-2)
            const shortMonth = transactionDate.toLocaleString('default', {
                month: 'short'
            })

            const monthlyData = monthlyRange.find((month) => 
                month.month === `${shortMonth} ${shortYear}`
            )

            if (!monthlyData) return

            // Update income/expense stats
            if (transaction.type === "income") {
                monthlyData.income += transaction.amount
            } else {
                monthlyData.expense += transaction.amount
            }
        })

        // create bar chart params (income 5 n expense 2)
        const statData = monthlyRange.flatMap((month) =>[
            {
                value: month.income,
                label: month.month,
                spacing: horizontalScale(4),
                labelWidth: horizontalScale(45),
                frontColor: colors.primary,
                topLabelComponent: () => 
                    React.createElement(
                        CustomText, 
                        { size: 8, color: colors.neutral200, style:{marginBottom:spacingX._3} }, 
                        String(toLabelNumber(month.income))
                    ),
            }, {
                value: month.expense,
                frontColor: colors.rose,
                topLabelComponent: () => 
                    React.createElement(
                        CustomText, 
                        { size: 8, color: colors.neutral200, style:{marginBottom:spacingX._3} }, 
                        String(toLabelNumber(month.expense))
                    ),
            },
        ])

        return{
            success: true,
            data: {
                statData,
                transactionData
            }
        }
    } catch (error:any) {
        return {
            success: false,
            msg: error.message
        }
        
    }
}

export const getYearlyData = async(
    uid: string,
    walletIds: string[],
    colors: any
): Promise<ResponseType> =>{
    try {

        let transactionsQuery = query(
            collection(db, "transactions"),
            where("uid", "==", uid),
            orderBy("date", "desc")
        )

        if (walletIds.length > 0) {
            transactionsQuery = query(
                transactionsQuery,
                where("walletId", "in", walletIds)  // "in" for multiple walletIds
            )
        }

        const transactionDocs = await getDocs(transactionsQuery)
        const transactionData: TransactionWithWalletType[] = []

        const firstTransaction = transactionDocs.docs.reduce((early, doc) => {
            const transactionDate = doc.data().date.toDate()
            return  transactionDate < early ? transactionDate : early
        }, new Date())

        const firstYear = firstTransaction.getFullYear()
        const currentYear = new Date().getFullYear()

        const yearlyRange = getYearsRange(firstYear, currentYear)

        const walletsQuery = collection(db, "wallets")
        const walletDocs = await getDocs(walletsQuery)
        const walletMap = new Map()
        walletDocs.forEach((doc) => walletMap.set(doc.id, doc.data().name))

        transactionDocs.forEach((doc) => {
            const transaction = doc.data() as TransactionWithWalletType
            transaction.id = doc.id

            transaction.walletName = walletMap.get(transaction.walletId) || "Unknown Wallet"
    
            transactionData.push(transaction)

            // Convert Firestore Timestamp to date string (YYYY-MM-DD)
            const transactionYear = (transaction.date as Timestamp).toDate().getFullYear()

            const yearlyData = yearlyRange.find((item: any) => item.year === transactionYear.toString())

            if (!yearlyData) return

            // Update income/expense stats
            if (transaction.type === "income") {
                yearlyData.income += transaction.amount
            } else {
                yearlyData.expense += transaction.amount
            }
        })

        // create bar chart params (income 5 n expense 2)
        const statData = yearlyRange.flatMap((year: any) =>[
            {
                value: year.income,
                label: year.year,
                spacing: horizontalScale(4),
                labelWidth: horizontalScale(45),
                frontColor: colors.primary,
                topLabelComponent: () => 
                    React.createElement(
                        CustomText, 
                        { size: 8, color: colors.neutral200, style:{marginBottom:spacingX._3} }, 
                        String(toLabelNumber(year.income))
                    ),
            }, {
                value: year.expense,
                frontColor: colors.rose,
                topLabelComponent: () => 
                    React.createElement(
                        CustomText, 
                        { size: 8, color: colors.neutral200, style:{marginBottom:spacingX._3} }, 
                        String(toLabelNumber(year.expense))
                    ),
            },
        ])

        return{
            success: true,
            data: {
                statData,
                transactionData
            }
        }
    } catch (error:any) {
        return {
            success: false,
            msg: error.message
        }
        
    }
}
