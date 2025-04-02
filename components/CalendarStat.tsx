import { useTheme } from '@/contexts/themeContext';
import { calendarStyle } from '@/styles/styles';
import { CalendarStatType, DayComponentType } from '@/types';
import { calendarConfig } from '@/utils/common';
import { StyleSheet, View } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { DayComponent } from './dayComponent';
import { Timestamp } from '@firebase/firestore';
import { convertToDateString } from '@/utils/dateFormater';

const CalendarStat = ({
    selectedDay,
    setSelectedDay,
    data
}: CalendarStatType) => {
    calendarConfig()

    const { colors } = useTheme()
    const styles = calendarStyle(colors)

    const calculateExpenseAndIncomePercentage = (allTransactions: { 
        date: string | Date | Timestamp; 
        amount: number; 
        type: "expense" | "income"; 
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

    return (
        <View>
            <Calendar
                style={styles.container}
                theme={{
                    calendarBackground: colors.neutral800,
                    textSectionTitleColor: colors.neutral100,
                    selectedDayBackgroundColor: colors.primary,
                    selectedDayTextColor: colors.white,
                    todayTextColor: colors.primary,
                    dayTextColor: colors.neutral200,
                    textDisabledColor: colors.neutral300,
                    arrowColor: colors.neutral200
                }}
                onDayPress={(day: any) => {
                    setSelectedDay(day.dateString);
                }}
                markedDates={{
                    [selectedDay]: { selected: true, disableTouchEvent: true },
                }}
                dayComponent={(props: DayComponentType) => (
                    <DayComponent
                        {...props}
                        selectedDay={selectedDay}
                        expenseData={expenseData}
                        incomeData={incomeData}
                        onPress={(day: any) => setSelectedDay(day.dateString)} // ✅ Pass onDayPress manually
                    />
                )
                }
            />
        </View>

    )
}

export default CalendarStat

const styles = StyleSheet.create({})