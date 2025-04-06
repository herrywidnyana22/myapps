import { TransactionType, TransactionWithWalletType } from "@/types";


export function getTotalExpenseIncome(
  data?: TransactionWithWalletType[] | TransactionType[]
) {
  if (!Array.isArray(data)) {
    return { totalExpense: 0, totalIncome: 0 };
  }

  const totalExpense = data
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = data
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  return { totalExpense, totalIncome };
}