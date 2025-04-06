import { useTheme } from '@/contexts/themeContext';
import { CalendarStatType, DayComponentType, GroupedTransactionType, TransactionItemSecondaryType, TransactionWithWalletType } from '@/types';
import { calendarConfig, transformTransactions } from '@/utils/common';
import { SectionList, SectionListData, View } from 'react-native'
import { AgendaList, Calendar, CalendarProvider, DateData, ExpandableCalendar } from 'react-native-calendars';
import { Timestamp } from '@firebase/firestore';
import { convertToDateString, toLabelDate } from '@/utils/dateFormater';
import { calendarStyle } from '@/styles/calendar/calendarStyles';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import TransactionList from './TransactionList';
import TransactionItemSecondary from './TransactionItemSecondary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacingX, spacingY } from '@/styles/themes';
import DayComponent from './dayComponent';
import { verticalScale } from '@/utils/style';
import testIDs from '@/constants/testIDs';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import CustomText from './CustomText';
import { getTotalExpenseIncome } from '@/utils/getAmount';
import AgendaListHeader from './AgendaListHeader';


const CalendarStat = ({
    selectedDay,
    setSelectedDay,
    data
}: CalendarStatType) => {
    calendarConfig()

    const [isReady, setIsReady] = useState(false)
    const [isInitialScrollDone, setInitialScrollDone] = useState(false)

    const { colors } = useTheme()
    const styles = calendarStyle(colors)
    
    const agendaListRef = useRef<SectionList>(null)

    const transactions: GroupedTransactionType[] = data?.length ? transformTransactions(data) : [];
    const validTransactions = transactions.filter((t) => t?.title && Array.isArray(t.data))
    
    const calendarTheme = {
        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: colors.white,
        todayTextColor: colors.primary,
        monthTextColor: colors.neutral100,
        dayTextColor: colors.neutral200,
        textDisabledColor: colors.neutral300,
        arrowColor: colors.neutral200,
        textMonthFontSize: 14,
        calendarBackground: colors.neutral800,
    }

    const calculateExpenseAndIncomePercentage = (allTransactions: { 
        date: string | Date | Timestamp; 
        amount: number; 
        type: "expense" | "income"
    }[]) => {
        const expenseData: Record<string, number> = {}
        const incomeData: Record<string, number> = {}
        const totalPerDay: Record<string, number> = {}
        const allDates = new Set<string>()
        

        // Step 1: Hitung total income & expense per tanggal
        allTransactions.forEach((transaction) => {
            const dateString = convertToDateString(transaction.date)
            allDates.add(dateString)

            if (transaction.type === "expense") {
                expenseData[dateString] = (expenseData[dateString] || 0) + transaction.amount
            } else if (transaction.type === "income") {
                incomeData[dateString] = (incomeData[dateString] || 0) + transaction.amount
            }

            // Total transaksi per hari (income + expense)
            totalPerDay[dateString] = (totalPerDay[dateString] || 0) + transaction.amount
        })

        // Step 2: Konversi ke persentase berdasarkan total transaksi per hari
        allDates.forEach((date) => {
            const totalAmount = totalPerDay[date] || 1 // Hindari pembagian dengan nol
            const expenseAmount = expenseData[date] || 0
            const incomeAmount = incomeData[date] || 0

            expenseData[date] = (expenseAmount / totalAmount) * 100
            incomeData[date] = (incomeAmount / totalAmount) * 100
        })

        return { expenseData, incomeData }
    }

    const { expenseData, incomeData } = calculateExpenseAndIncomePercentage(data)

    const onDayPress = (day: DateData) => {
        setSelectedDay(day.dateString)

        const sectionIndex = transactions.findIndex(
            (section) => section.title === day.dateString
        )

        if (sectionIndex !== -1 && agendaListRef.current) {

            agendaListRef.current.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
                animated: true,
            })
        }
    };

    const renderDay = useCallback((dayProps: DayProps & { date?: DateData }) => {
        return (
            <DayComponent
                {...dayProps}
                selectedDay={selectedDay}
                expenseData={expenseData}
                incomeData={incomeData}
                onPress={onDayPress}
            />
        )
    }, [selectedDay])

    const renderAgenda = useCallback(({ item, index }: { item: TransactionWithWalletType; index: number }) => (
        <TransactionItemSecondary
            item={item}
            index={index}
            onClick={(day: any) => {
                setSelectedDay((prevSelectedDay) =>
                    prevSelectedDay === day.dateString ? "" : day.dateString
                )
            }}
        />
    ), [selectedDay])

    const renderSectionHeader = useCallback((title: any) => {
        const date = title as unknown as string
        const transactionByDate = validTransactions.find((s) => s.title === date)

        if (!transactionByDate) return null

        const { totalExpense, totalIncome } = getTotalExpenseIncome(transactionByDate?.data)

        return (
            <AgendaListHeader
                date={date}
                transactionsLength={transactionByDate?.data.length ?? 0}
                totalAmount={ totalIncome - totalExpense}

            />
        )
    }, [validTransactions])


    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        const firstVisibleItem = viewableItems?.[0]
        const title = firstVisibleItem?.section?.title

        // console.log("BEFORE1: ", title)

        if (title) {
            setSelectedDay(title)
            // console.log("AFTER1: ", title)
        }
    }).current

    
    useLayoutEffect(() => {
        setIsReady(true)
    }, [])

    return (
        isReady && (
            <CalendarProvider date={validTransactions[1]?.title || new Date().toLocaleDateString('en-CA')}>
                <ExpandableCalendar
                    testID={testIDs.expandableCalendar.CONTAINER}
                    key={colors.neutral800}
                    theme={calendarTheme}
                    style={{ marginHorizontal: -spacingX._20 }}
                    allowShadow={false}
                    firstDay={1}
                    // markedDates={{[selectedDay]: { selected: true }}}
                    dayComponent={renderDay}
                    animateScroll
                />
                <AgendaList
                    style={{ marginHorizontal: -spacingX._20 }}
                    sections={validTransactions}
                    renderItem={renderAgenda}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderSectionHeader={renderSectionHeader}
                />
            </CalendarProvider>
        )
            

    )
}

export default CalendarStat