import { QueryConstraint } from "firebase/firestore";
import useData from "./useData";
import { TransactionType } from "@/types";

const useTransactionsWithWallets = (
    collectionName: string, 
    constraints: QueryConstraint[] = [],
    selectedWalletIds: string[] | undefined = [] // Default to empty array if undefined
) => {
    const { data: transactions, isLoading: transactionsLoading, error } = useData<TransactionType>(
        collectionName, constraints
    )

    const { data: wallets, isLoading: walletsLoading } = useData<{ id: string; name: string }>("wallets");

    const walletIdsToFilter = selectedWalletIds ?? []

    const filteredTransactions = transactions.filter(transaction =>
        walletIdsToFilter.length === 0 || walletIdsToFilter.includes(transaction.walletId)
    )

    const transactionsWithWalletName = filteredTransactions.map(transaction => ({
        ...transaction,
        walletName: wallets.find(wallet => wallet.id === transaction.walletId)?.name || "Unknown",
    }))

    return { data: transactionsWithWalletName, isLoading: transactionsLoading || walletsLoading, error };
}

export default useTransactionsWithWallets