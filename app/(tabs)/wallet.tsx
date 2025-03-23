import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/styles/themes'
import { verticalScale } from '@/utils/style'
import CustomText from '@/components/CustomText'
import { Plus } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import useData from '@/hooks/useData'
import { WalletType } from '@/types'
import { useAuth } from '@/contexts/authContext'
import { orderBy, where } from 'firebase/firestore'
import Loading from '@/components/Loading'
import WalletItem from '@/components/WalletItem'
import { toLabelIdr } from '@/utils/idrFormater'

const Wallet = () => {
  const router = useRouter()
  const {user} = useAuth()
  
  const {data: walletData, isLoading, error} = useData<WalletType>(
    "wallets",
    [
      where("uid", "==", user?.uid),
      orderBy("created", "desc")
    ]
  )
  const totalBalance = () =>{
    const totalAmount = walletData.reduce((total, item) => total + (item.amount || 0), 0)
    
    return toLabelIdr(totalAmount)
  }
   
  
  return (
    <ScreenWrapper
      style={{backgroundColor: colors.black}}
    >
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <CustomText
            size={45}
            fontWeight={'500'}
          >
            {totalBalance()}
          </CustomText>
          <CustomText
            size={15}
            color={colors.neutral400}
          >
            Total Balance
          </CustomText>
        </View>

        <View style={styles.wallet}>
          <View style={styles.flexRow}>
            <CustomText 
              size={20}

            >
              My Wallet
            </CustomText>
            <TouchableOpacity
              onPress={() => router.push('/(modals)/walletModal' as any)}
              style={styles.addIcon}
            >
              <Plus
                size={verticalScale(20)}
                strokeWidth={3}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>

          { isLoading && <Loading/>}
          <FlatList
            contentContainerStyle={styles.list}
            data={walletData}
            renderItem={({item, index}) =>{
              return (
                <WalletItem
                  item={item}
                  index={index}
                  router={router}
                />
              )
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between'
  },
  balanceView:{
    height: verticalScale(160),
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flexRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacingY._10
  },
  wallet:{
    flex: 1,
    backgroundColor: colors.neutral900,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25
  },
  list:{
    paddingVertical: spacingX._25,
    paddingTop: spacingY._15
  }, 
  addIcon:{
    backgroundColor: colors.primary, 
    borderRadius:'50%', 
    padding:verticalScale(5)
  }
})