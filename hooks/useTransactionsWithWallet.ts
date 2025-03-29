import { where, orderBy, limit, QueryConstraint } from "firebase/firestore";
import useData from "./useData";
import { TransactionType } from "@/types";

const useTransactionsWithWallets = (
    collectionName: string, 
    constraints: QueryConstraint[] =[]
) => {
    const { data: transactions, isLoading: transactionsLoading, error } = useData<TransactionType>(
        collectionName, constraints
    );

    const { data: wallets, isLoading: walletsLoading } = useData<{ id: string; name: string }>("wallets");

    // Merge transactions with wallet names
    const transactionsWithWalletName = transactions.map(transaction => ({
        ...transaction,
        walletName: wallets.find(wallet => wallet.id === transaction.walletId)?.name || "Unknown",
    }));

    return { data: transactionsWithWalletName, isLoading: transactionsLoading || walletsLoading, error };
}

export default useTransactionsWithWallets;