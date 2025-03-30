import { auth } from '@/config/firebase'
import { Image } from "expo-image"
import { useAuth } from '@/contexts/authContext'
import { signOut } from 'firebase/auth'
import { useTheme } from '@/contexts/themeContext'
import { spacingY } from '@/styles/themes'
import { useRouter } from 'expo-router'
import { getAvatar } from '@/services/imageService'
import { profileStyle } from '@/styles/tabs/tabStyles'
import { ChevronRight } from 'lucide-react-native'
import { accountOption } from '@/constants/data'
import { verticalScale } from '@/utils/style'
import { accountOptionType } from '@/types'
import { Alert, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

import Header from '@/components/Header'
import CustomText from '@/components/CustomText'
import BackButton from '@/components/BackButton'
import ScreenWrapper from '@/components/ScreenWrapper'

const Profile = () => {
  const router = useRouter()
  const {user} = useAuth()

  const {colors} = useTheme()
  const styles = profileStyle(colors)

  const onLogout = async() =>{
    await signOut(auth)
  }

  const logoutAlert = () =>{
    Alert.alert("Confirm","Are you sure want to logout?",[
      {
        text: 'Cancel',
        style: 'cancel',
      },{
        text: 'Logout',
        style: 'destructive',
        onPress: () => onLogout()
      }
    ])
  }

  const onPressed = async(item: accountOptionType) =>{
    if(item.title === 'Logout'){
      logoutAlert()
    }

    if(item.routeName){
      router.push(item.routeName)
    }
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header
          title='Profile'
          leftIcon={<BackButton/>}
          style={{marginVertical: spacingY._10}}
        />
        <View 
          style={styles.userInfo}
        >
          <View>
            <Image 
              source={getAvatar(user?.image)}
              contentFit='cover'
              transition={100}
              style={styles.avatar}
            />
          </View>
          <View style={styles.nameContainer}>
            <CustomText
              size={24}
              fontWeight={'600'}
              color={colors.neutral100}
            >
              { user?.name }
            </CustomText>
            <CustomText
              size={15}
              color={colors.neutral400}
            >
              { user?.email }
            </CustomText>
          </View>
        </View>
        
        <View style={styles.accountOption}>
          {
            accountOption.map((item, index) => {
              const Icon = item.icon
              return(
                <Animated.View 
                  key={index.toString()}
                  entering={ FadeInDown
                    .delay(index*50)
                    .damping(14)
                    .springify()
                  } 
                  style={styles.listItem}
                >
                  <TouchableOpacity 
                    onPress={() => onPressed(item)}
                    style={styles.flexRow}
                  >
                    <View
                      style={[styles.listIcon, {backgroundColor: item?.bgColor}]}
                    >
                      { Icon && <Icon size={21} color="white" strokeWidth={2}/> }
                    </View>
                    <CustomText 
                      size={16}
                      fontWeight={'500'}
                      color={colors.neutral300}
                      style={{flex: 1}}
                    >
                      { item.title }
                    </CustomText>
                    <ChevronRight
                      size={verticalScale(18)}
                      color={colors.neutral400}
                      strokeWidth={2}
                    />
                  </TouchableOpacity>
                </Animated.View>
              )
            })
          }
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile