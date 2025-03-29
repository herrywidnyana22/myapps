import { TransactionType, TransactionWithWalletType } from "@/types";


export function getTotalExpenseIncome (data: TransactionWithWalletType[] | TransactionType[]) {
    const totalExpense = data
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalIncome = data
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0)

    return {totalExpense, totalIncome}
}