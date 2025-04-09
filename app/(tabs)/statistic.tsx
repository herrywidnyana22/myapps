import { useAuth } from '@/contexts/authContext';
import { useTheme } from '@/contexts/themeContext';
import { spacingY } from '@/styles/themes'
import { BarChart } from "react-native-gifted-charts";
import { Alert, View } from 'react-native'
import { ResponseType, StatisticType, TransactionWithWalletType, WalletType } from "@/types";
import { toLabelNumber } from '@/utils/idrFormater';
import { statisticStyle } from '@/styles/tabs/tabStyles';
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getTotalExpenseIncome } from '@/utils/getAmount';
import { horizontalScale, verticalScale } from '@/utils/style'
import { getMonthlyData, getWeeklyData, getYearlyData } from '@/services/transactionService';


import Header from '@/components/Header'
import Loading from '@/components/Loading';
import ScreenWrapper from '@/components/ScreenWrapper'
import BarChartVersus from '@/components/BarChartVersus';
import TransactionList from '@/components/TransactionList';
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import { orderBy, where } from 'firebase/firestore';
import useData from '@/hooks/useData';
import VerticalSegmentedControl from '@/components/VerticalSegmentControl';
import CalendarStat from '@/components/CalendarStat';
import useTransactionsWithWallets from '@/hooks/useTransactionsWithWallet';
import { convertToDateString, today } from '@/utils/dateFormater';

const Statistic = () => {

  const {user}= useAuth()
  
  const { colors } = useTheme()
  const styles = statisticStyle(colors)

  const [chartData, setChartData] = useState([])
  const [transactions, setTransactions] = useState<TransactionWithWalletType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const [selectedDay, setSelectedDay] = useState('')

  const [selectedWallets, setSelectedWallets] = useState<string[]>([])
  const [selectedWalletIds, setSelectedWalletIds] = useState<string[]>([])
  const [statistic, setStatistic] = useState<StatisticType>({
    viewMode: "Chart",
    range: "Weekly",
  })


  const viewModeValues: StatisticType["viewMode"][] = ["Calendar", "Chart"]
  const rangeValues: StatisticType["range"][] = ["Weekly", "Monthly", "Yearly"]

  const { data: walletData, isLoading: walletLoading } = useData<WalletType>(
    "wallets",
    [where("uid", "==", user?.uid), orderBy("created", "desc")]
  )

const { data: allTransactions, isLoading: allTransactionLoading, error } = 
    useTransactionsWithWallets("transactions", [
      where("uid", "==", user?.uid),
      orderBy("date", "desc"),
    ], selectedWalletIds)

  const segmentWalletValues = useMemo(
    () => ["All", ...(walletData?.map(wallet => wallet.name) || [])],
    [walletData]
  )

  const walletMap = useMemo(() => {
    const map: Record<string, string> = {}

    walletData?.forEach(wallet => {
      if (wallet.id && wallet.name) { 
        map[wallet.name] = wallet.id
      }
    })

    return map

  }, [walletData])

  const onWalletSegmentChange = useCallback((walletName: string) => {
    
    const walletId = walletMap[walletName] || null

    setSelectedWallets((prevWallets) => {
        if (walletName === "All") {
            return []
        }

        return prevWallets.includes(walletName)
            ? prevWallets.filter((name) => name !== walletName)
            : [...prevWallets, walletName]
    })

    setSelectedWalletIds((prevIds) => {
        if (walletName === "All") {
            return []
        }

        return walletId
            ? prevIds.includes(walletId)
                ? prevIds.filter((id) => id !== walletId)
                : [...prevIds, walletId]
            : prevIds
    })
  },[walletMap])

  const getStat = useCallback(async (action: () => Promise<ResponseType>) => {
    setIsLoading(true)
    const response = await action()

    if (!response.success) {
      setIsLoading(false)
      return Alert.alert("Error", "Error to get statistic data")
    }

    const { totalExpense, totalIncome } = getTotalExpenseIncome(response?.data?.transactionData);
    setExpense(totalExpense)
    setIncome(totalIncome)
    setChartData(response?.data?.statData)
    setTransactions(response?.data?.transactionData)
    setIsLoading(false)
  }, [])


  const onSegmentChange = (
    key: keyof StatisticType, 
    values: string[], 
    e: any
  ) => {
    const index = e?.nativeEvent?.selectedSegmentIndex
    if (index !== undefined && index !== null) {
      setStatistic((prev) => ({
        ...prev,
        [key]: values[index], // Dynamically update either `viewMode` or `range`
      }))
    }
  }

  const calendarData = useMemo(() => {
    if (!allTransactions) return []

    return allTransactions.filter((transaction) => {
      // const dateString = convertToDateString(transaction.date)

      // const isSameDay = dateString === selectedDay
      const isWalletMatch =
        !selectedWalletIds || selectedWalletIds.length === 0
          ? true
          : selectedWalletIds.includes(transaction.walletId)

      // return isSameDay && isWalletMatch
      return isWalletMatch
    })
  }, [allTransactions, selectedWalletIds])

useEffect(() => {
  if (statistic.viewMode === "Chart") {
    if (statistic.range === "Weekly") {
      getStat(() => getWeeklyData(user?.uid as string, selectedWalletIds, colors));
    }

    if (statistic.range === "Monthly") {
      getStat(() => getMonthlyData(user?.uid as string, selectedWalletIds, colors));
    }

    if (statistic.range === "Yearly") {
      getStat(() => getYearlyData(user?.uid as string, selectedWalletIds, colors));
    }
    
  } 
}, [statistic, selectedWalletIds])

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title='Statistic'/>
        </View>

        <View style={[
          styles.scrollContainer,
          statistic.viewMode === "Calendar" && { flex: 1 },

        ]}>
          <SegmentedControl
            values={viewModeValues}
            selectedIndex={viewModeValues.indexOf(statistic.viewMode)}
            tintColor={colors.neutral200}
            backgroundColor={colors.neutral900}
            appearance='dark'
            activeFontStyle={styles.segmentFontStyle}
            style={styles.segmentStyle}
            fontStyle={{...styles.segmentFontStyle, color: colors.white}}
            onChange={(e) => onSegmentChange("viewMode", viewModeValues, e)}
          />
          {
            statistic.viewMode === "Chart" && 
            <SegmentedControl
              values={rangeValues}
              selectedIndex={rangeValues.indexOf(statistic.range)}
              tintColor={colors.neutral200}
              backgroundColor={colors.neutral900}
              appearance='dark'
              activeFontStyle={styles.segmentFontStyle}
              style={styles.secondarySegmentStyle}
              fontStyle={{...styles.segmentFontStyle, color: colors.white}}
              onChange={(e) => onSegmentChange("range", rangeValues, e)}
            />
          }
          {
            segmentWalletValues.length > 0 && (
              <VerticalSegmentedControl
                values={segmentWalletValues}
                selectedValue={selectedWallets}
                onChange={onWalletSegmentChange}
              />
            )
          }
          {
            statistic.viewMode === "Chart" 
            ? (
              <>
                <View style={styles.chartContainer}>
                  {
                    chartData.length > 0 
                    ? (
                      <BarChart
                        data={chartData}
                        barWidth={horizontalScale(20)}
                        spacing={[1, 2].includes(rangeValues.indexOf(statistic.range))
                          ? horizontalScale(25)
                          : horizontalScale(16)
                        }
                        yAxisThickness={0}
                        xAxisThickness={0}
                        yAxisLabelWidth={0}
                        formatYLabel={toLabelNumber}
                        xAxisLabelTextStyle={{
                          color: colors.neutral300,
                          fontSize: verticalScale(12)
                        }}
                        noOfSections={4}
                        minHeight={10}
                        isAnimated={true}
                        animationDuration={500}
                        roundedTop
                        hideRules
                      />) 
                    : (
                      <View style={styles.noChart}/>
                    )
                  }{
                    isLoading && (
                      <View style={styles.chartLoadingContainer}>
                        <Loading color={colors.white}/>
                      </View>

                    )
                  }
                </View>

                {
                  transactions.length > 0 &&
                  <BarChartVersus
                    expense={expense}
                    income={income}
                  />
                }

                <TransactionList
                  data={transactions}
                  variant={'default'}
                  title={'Transactions'}
                  emptyListMessage='No transactions'
                  isLoading={isLoading}
                />
              </>
            ): (
              <CalendarStat
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
                data={calendarData}
              />
            )
          }
          
        </View>
      </View>
    </ScreenWrapper>

  //   <ScreenWrapper>
  //     <View style={styles.container}>
  //       <View style={[styles.scrollContainer, { flex: 1 }]}>
  //         <CalendarStat
  //           selectedDay={selectedDay}
  //           setSelectedDay={setSelectedDay}
  //           data={allTransactions}
  //         />
  //       </View>
  //     </View>
  //   </ScreenWrapper>
  )
}

export default Statistic
