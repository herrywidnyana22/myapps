import { useAuth } from '@/contexts/authContext';
import { useTheme } from '@/contexts/themeContext';
import { spacingY } from '@/styles/themes'
import { BarChart } from "react-native-gifted-charts";
import { Alert, View } from 'react-native'
import { ResponseType, WalletType } from "@/types";
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

const Statistic = () => {

  const {user}= useAuth()
  
  const { colors } = useTheme()
  const styles = statisticStyle(colors)

  const [chartData, setChartData] = useState([])
  const [transactions, setTransactions] = useState([])
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)

  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [walletIndex, setWalletIndex] = useState(0)

  const { data: walletData, isLoading: walletLoading } = useData<WalletType>(
    "wallets",
    [where("uid", "==", user?.uid), orderBy("created", "desc")]
  )

  // Create a mapping of walletName to walletId
  const walletMap = useMemo(() => {
    const map: Record<string, string> = {} // { walletName: walletId }
    walletData?.forEach(wallet => {
      if (wallet.id && wallet.name) { 
        map[wallet.name] = wallet.id // Ensure both id & name exist before assignment
      }
    })

    return map
  }, [walletData])

  const segmentWalletValues = useMemo(
    () => ["All", ...(walletData?.map(wallet => wallet.name) || [])],
    [walletData]
  )

  const onWalletSegmentChange = (index: number) => {
    setWalletIndex(index)
    const selectedWalletName = segmentWalletValues[index]

    // Get walletId (null if "All" is selected)
    const selectedWalletId = selectedWalletName === "All" ? null : walletMap[selectedWalletName] || null;
    setSelectedWallet(selectedWalletId)
  }

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

    useEffect(() => {
    if(activeSegmentIndex === 0){
      getStat(() => getWeeklyData(user?.uid as string, selectedWallet, colors))
    }
    if(activeSegmentIndex === 1){
      getStat(() => getMonthlyData(user?.uid as string, selectedWallet, colors))
    }
    if(activeSegmentIndex === 2){
      getStat(() => getYearlyData(user?.uid as string, selectedWallet, colors))
    }
  }, [activeSegmentIndex, selectedWallet])

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header title='Statistic'/>
        </View>

        <View
          style={styles.scrollContainer}
        >
          <SegmentedControl
            values={['Weekly', 'Monthly', 'Yearly']}
            selectedIndex={activeSegmentIndex}
            tintColor={colors.neutral200}
            backgroundColor={colors.neutral800}
            appearance='dark'
            activeFontStyle={styles.segmentFontStyle}
            style={styles.segmentStyle}
            fontStyle={{...styles.segmentFontStyle, color: colors.white}}
            onChange={(e) => setActiveSegmentIndex(e.nativeEvent.selectedSegmentIndex)}
          />

          <VerticalSegmentedControl
            values={segmentWalletValues}
            selectedIndex={walletIndex}
            onChange={onWalletSegmentChange}
          />
          
          <View style={styles.chartContainer}>
            {
              chartData.length !== 0 
              ? (
                <BarChart
                  data={chartData}
                  barWidth={horizontalScale(20)}
                  spacing={[1, 2].includes(activeSegmentIndex)
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

          <BarChartVersus
            expense={expense}
            income={income}
          />

          <View style={{marginTop: spacingY._10}}>
            <TransactionList
              data={transactions}
              title={'Transactions'}
              emptyListMessage='No transactions'
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Statistic
