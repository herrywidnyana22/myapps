import { Alert, StyleSheet, View } from 'react-native'
import { colors, radius, spacingX, spacingY } from '@/styles/themes'
import { horizontalScale, verticalScale } from '@/utils/style'
import { useEffect, useState } from 'react'
import { BarChart } from "react-native-gifted-charts";

import ScreenWrapper from '@/components/ScreenWrapper'
import Header from '@/components/Header'
import SegmentedControl from '@react-native-segmented-control/segmented-control'
import Loading from '@/components/Loading';
import CustomText from '@/components/CustomText';
import { useAuth } from '@/contexts/authContext';
import { getMonthlyData, getWeeklyData, getYearlyData } from '@/services/transactionService';
import TransactionList from '@/components/TransactionList';
import { ResponseType } from "@/types";
import BarChartVersus from '@/components/BarChartVersus';
import { getTotalExpenseIncome } from '@/utils/getAmount';
import { toLabelNumber } from '@/utils/idrFormater';

const Statistic = () => {

  const {user}= useAuth()

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
      // return Alert.alert("Error", "Error to get statistic data")
      return Alert.alert("Error", response?.msg)
    }

    setChartData(response?.data?.statData)
    setTransactions(response?.data?.transactionData)
  }

  useEffect(() => {
    if(activeSegmentIndex === 0){
      getStat(() => getWeeklyData(user?.uid as string))
    }
    if(activeSegmentIndex === 1){
      getStat(() => getMonthlyData(user?.uid as string))
    }
    if(activeSegmentIndex === 2){
      getStat(() => getYearlyData(user?.uid as string))
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
                  // yAxisLabelPrefix='Rp.'
                  // yAxisTextStyle={{
                  //   color: colors.neutral300,
                  //   fontSize: verticalScale(9)
                  // }}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  yAxisLabelWidth={0}
                  // yAxisLabelWidth={[1, 2].includes(activeSegmentIndex)
                  //   ? horizontalScale(38)
                  //   : horizontalScale(35)
                  // }
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

const styles = StyleSheet.create({
  container: {
    gap: spacingY._10,
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._5,
  },
  scrollContainer:{
    gap: spacingY._20,
    paddingTop: spacingY._5,
    paddingBottom: verticalScale(100)
  },
  chartContainer:{
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartLoadingContainer:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: radius._12,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  header:{

  },
  noChart:{
    height: verticalScale(210),
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  searchIcon:{
    height: verticalScale(35),
    width: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderCurve: 'continuous',
    backgroundColor: colors.neutral700,
  },
  segmentStyle:{
    height: horizontalScale(37),
  },
  segmentFontStyle:{
    fontSize: verticalScale(13),
    fontWeight: 'bold',
    color: colors.black,
  }
})