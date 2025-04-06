import { DayComponentType, TransactionItemProps } from "@/types"

export function areTransactionPropsEqual(
  prev: TransactionItemProps,
  next: TransactionItemProps
): boolean {
  return (
    prev.item.id === next.item.id &&
    prev.item.amount === next.item.amount &&
    prev.item.category === next.item.category &&
    prev.item.description === next.item.description &&
    prev.item.walletName === next.item.walletName
  )
}

export function areDayComponentEqual(prev: DayComponentType, next: DayComponentType): boolean {
  return (
    prev.date?.dateString === next.date?.dateString &&
    prev.state === next.state &&
    prev.selectedDay === next.selectedDay &&
    prev.expenseData[prev.date?.dateString ?? ""] === next.expenseData[next.date?.dateString ?? ""] &&
    prev.incomeData[prev.date?.dateString ?? ""] === next.incomeData[next.date?.dateString ?? ""]
  )
}