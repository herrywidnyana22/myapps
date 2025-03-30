import { Plus } from 'lucide-react-native'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import { useRouter } from 'expo-router'
import { WalletType } from '@/types'
import { toLabelIdr } from '@/utils/idrFormater'
import { walletStyle } from '@/styles/tabs/tabStyles'
import { verticalScale } from '@/utils/style'
import { orderBy, where } from 'firebase/firestore'
import { FlatList, TouchableOpacity, View } from 'react-native'

import useData from '@/hooks/useData'
import Loading from '@/components/Loading'
import CustomText from '@/components/CustomText'
import WalletItem from '@/components/WalletItem'
import ScreenWrapper from '@/components/ScreenWrapper'

const Wallet = () => {
  const router = useRouter()
  const {user} = useAuth()

  const {colors} = useTheme()
  const styles = walletStyle(colors)
  
  const {data: walletData, isLoading} = useData<WalletType>(
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
            color={colors.neutral200}
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
              color={colors.neutral200}
              fontWeight={'500'}
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