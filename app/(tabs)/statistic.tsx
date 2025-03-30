import { useAuth } from '@/contexts/authContext';
import { useTheme } from '@/contexts/themeContext';
import { spacingY } from '@/styles/themes'
import { BarChart } from "react-native-gifted-charts";
import { Alert, View } from 'react-native'
import { ResponseType } from "@/types";
import { toLabelNumber } from '@/utils/idrFormater';
import { statisticStyle } from '@/styles/tabs/tabStyles';
import { useEffect, useState } from 'react'
import { getTotalExpenseIncome } from '@/utils/getAmount';
import { horizontalScale, verticalScale } from '@/utils/style'
import { getMonthlyData, getWeeklyData, getYearlyData } from '@/services/transactionService';


import Header from '@/components/Header'
import Loading from '@/components/Loading';
import ScreenWrapper from '@/components/ScreenWrapper'
import BarChartVersus from '@/components/BarChartVersus';
import TransactionList from '@/components/TransactionList';
import SegmentedControl from '@react-native-segmented-control/segmented-control'

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

  const getStat = async(
    action: () => Promise<ResponseType>
  ) =>{
    setIsLoading(true)
    const response = await action()
    const {totalExpense, totalIncome} = getTotalExpenseIncome(response?.data?.transactionData)
    setExpense(totalExpense)
    setIncome(totalIncome)
    setIsLoading(false)

    if(!response.success){
      return Alert.alert("Error", "Error to get statistic data")
      // return Alert.alert("Error", response?.msg)
    }

    setChartData(response?.data?.statData)
    setTransactions(response?.data?.transactionData)
  }

  useEffect(() => {
    if(activeSegmentIndex === 0){
      getStat(() => getWeeklyData(user?.uid as string, colors))
    }
    if(activeSegmentIndex === 1){
      getStat(() => getMonthlyData(user?.uid as string, colors))
    }
    if(activeSegmentIndex === 2){
      getStat(() => getYearlyData(user?.uid as string, colors))
    }
  }, [activeSegmentIndex])


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
            onChange={(e) => {
              setActiveSegmentIndex(e.nativeEvent.selectedSegmentIndex)
            }}
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
