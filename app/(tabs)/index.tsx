import { useAuth } from '@/contexts/authContext'
import { spacingY } from '@/styles/themes'
import { useTheme } from '@/contexts/themeContext';
import { useRouter } from 'expo-router'
import { toLabelIdr } from '@/utils/idrFormater';
import { homeStyles } from '@/styles/tabs/tabStyles';
import { WalletType } from '@/types';
import { Plus, Search } from 'lucide-react-native'
import { verticalScale } from '@/utils/style'
import { useSharedValue } from 'react-native-reanimated';
import { useMemo, useState } from 'react';
import { startOfDay, endOfDay } from "date-fns";
import { getTotalExpenseIncome } from '@/utils/getAmount'
import { orderBy, Timestamp, where } from 'firebase/firestore'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'

import Card from '@/components/Card';
import Button from '@/components/Button'
import useData from '@/hooks/useData';
import CustomText from '@/components/CustomText'
import ScreenWrapper from '@/components/ScreenWrapper'
import BarChartVersus from '@/components/BarChartVersus'
import TransactionList from '@/components/TransactionList'
import useTransactionsWithWallets from '@/hooks/useTransactionsWithWallet'

const Home = () => {

  const [cardActiveID, setCardActiveID] = useState<'totalBalance' | 'todayBalance' |  string>('totalBalance')

  const {user} = useAuth()
  const router = useRouter()

  const { colors } = useTheme()
  const styles = homeStyles(colors)

  // for card stack style
  const animatedValue = useSharedValue(0)
  const currentIndex = useSharedValue(0)
  const prevIndex = useSharedValue(0)

  const today = new Date()
  const startOfDayTimestamp = startOfDay(today).getTime()
  const endOfDayTimestamp = endOfDay(today).getTime()

  const { data: walletData, isLoading: walletLoading } = useData<WalletType>(
    "wallets",
    [
      where("uid", "==", user?.uid), 
      orderBy("created", "desc")
    ]
  )

  const { data: transactions, isLoading: transactionLoading, error } = 
    useTransactionsWithWallets("transactions", [
      where("uid", "==", user?.uid),
      orderBy("date", "desc"),
    ])
  
  const filteredTransactions = useMemo(() => {
    if (!transactions) return []

    switch (cardActiveID) {
      case "totalBalance":
        return transactions;

     case "todayBalance":
      return transactions.filter((transaction) => {

        // Ensure Firestore Timestamp is converted to a JavaScript Date object
        const transactionDate =
          transaction.date instanceof Date
            ? transaction.date
            : (transaction.date as Timestamp).toDate() 

        return (
          transactionDate.getTime() >= startOfDayTimestamp &&
          transactionDate.getTime() < endOfDayTimestamp
        )
      })

      default:
        return transactions.filter(
          (transaction) => transaction.walletId === cardActiveID
        )
    }
  }, [cardActiveID, transactions, startOfDayTimestamp, endOfDayTimestamp])


  const { totalExpense, totalIncome } = getTotalExpenseIncome(filteredTransactions)

  const updatedWalletData = walletData 
    ? [ 
        {
          id: 'totalBalance',
          name: "TOTAL WALLET",
          totalIncome: walletData.reduce((sum, item) => sum + Number(item.totalIncome), 0),
          totalExpenses: walletData.reduce((sum, item) => sum + Number(item.totalExpenses), 0),
          amount: walletData.reduce((sum, item) => sum + Number(item.amount), 0),
          image: null,
        }, {
          id: 'todayBalance',
          name: "TODAY BALANCE",
          totalIncome,
          totalExpenses: totalExpense,
          amount: totalIncome - totalExpense,
          image: null,
        },
        ...walletData,
      ] 
    : []
    

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <CustomText
              size={16}
              color={colors.neutral200}
            >
              Hello
            </CustomText>
            <CustomText
              size={20}
              fontWeight={'500'}
              color={colors.neutral200}
            >
              {user?.name}
            </CustomText>
          </View>

          <TouchableOpacity 
            onPress={() => router.push('/(modals)/searchModal')}
            style={styles.searchIcon}
          >
            <Search
              size={verticalScale(20)}
              color={colors.neutral200}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        <View style={{ gap: spacingY._25, position: 'relative', }}>
          <SafeAreaView style={styles.areaViewContainer}>
            {
              updatedWalletData.map((wallet, index) => (
                <Card
                  key={index}
                  nextId={index < updatedWalletData.length - 1 ? updatedWalletData[index + 1]?.id : null}
                  prevId={index > 0 ? updatedWalletData[index - 1]?.id : null}
                  index={index}
                  currentIndex={currentIndex}
                  prevIndex={prevIndex}
                  animateValue={animatedValue}
                  dataLength={updatedWalletData.length}
                  title={wallet.name}
                  totalBalance={toLabelIdr(wallet.amount ?? 0)} // Ensure this is formatted properly
                  totalIncome={toLabelIdr(wallet.totalIncome ?? 0)}
                  totalExpense={toLabelIdr(wallet.totalExpenses ?? 0)}
                  setCardActiveID = {setCardActiveID}
                  isLoading={walletLoading}
                />
            ))}
          </SafeAreaView>
          <BarChartVersus
            expense={totalExpense}
            income={totalIncome}
          />
          <TransactionList
            title='Transactions'
            data={filteredTransactions}
            isLoading={transactionLoading}
            emptyListMessage='No transaction...'
          />
        </View>
        <Button
          onPress={() => router.push('/(modals)/transactionModal')}
          style={styles.floatingButton}
        >
          <Plus
            color={colors.black}
            strokeWidth={3}
            size={verticalScale(28)}
          />
        </Button>
      </View>
      
    </ScreenWrapper>
  )
}

export default Home
