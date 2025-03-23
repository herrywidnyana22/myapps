

import { useAuth } from '@/contexts/authContext'
import { useRouter } from 'expo-router'
import { Plus, Search } from 'lucide-react-native'
import { verticalScale } from '@/utils/style'
import { colors, spacingX, spacingY } from '@/styles/themes'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Button from '@/components/Button'
import HomeCard from '@/components/HomeCard'
import CustomText from '@/components/CustomText'
import ScreenWrapper from '@/components/ScreenWrapper'
import TransactionList from '@/components/TransactionList'
import useData from '@/hooks/useData'
import { limit, orderBy, where } from 'firebase/firestore'
import { TransactionType, WalletType } from '@/types'

const Home = () => {

  const {user} = useAuth()
  const router = useRouter()

  const {
    data: recentTransactions, 
    isLoading: transactionLoading, 
    error
  } = useData<TransactionType>(
    "transactions", [
      where("uid", "==", user?.uid),
      orderBy("date", "desc"),
      limit(30)
    ]
  )

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ gap: 4 }}>
            <CustomText
              size={16}
              color={colors.neutral400}
            >
              Hello
            </CustomText>
            <CustomText
              size={20}
              fontWeight={'500'}
            >
              {user?.name}
            </CustomText>
          </View>

          <TouchableOpacity>
            <Search
              size={verticalScale(23)}
              color={colors.neutral200}
              strokeWidth={3}
            />
          </TouchableOpacity>
        </View>

        <View style={{ gap: spacingY._25 }}>
          <View>
            <HomeCard/>
          </View>
          <TransactionList
            title='Recent Transaction'
            data={recentTransactions}
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

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: spacingX._20,
    marginTop: verticalScale(8)
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacingY._10
  },
  searchIcon:{
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50
  },
  floatingButton:{
    height: verticalScale(50),
    width: verticalScale(50),
    position: 'absolute',
    right: verticalScale(30),
    bottom: verticalScale(30),
    borderRadius: 100,

  },
})