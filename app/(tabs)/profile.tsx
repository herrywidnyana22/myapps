import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/themes'
import { verticalScale } from '@/utils/style'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import CustomText from '@/components/CustomText'
import { useAuth } from '@/contexts/authContext'
import {Image} from "expo-image"
import { getAvatar } from '@/services/imageService'
import { accountOptionType } from '@/types'
import { ChevronRight, Power, Settings, User } from 'lucide-react-native'
import { accountOption } from '@/constants/data'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {
  const router = useRouter()
  const {user} = useAuth()
  const onLogout = async() =>{
    await signOut(auth)
  }

  const logoutAlert = () =>{
    Alert.alert("Confirm","Are you sure want to logout?",[
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => console.log('Cancel Pressed'),
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

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: spacingX._20
  },
  userInfo:{
    alignItems: 'center',
    gap: spacingY._15,
    marginTop: verticalScale(30),
  },
  avatar:{
    height: verticalScale(135),
    width: verticalScale(135),
    alignSelf: 'center',
    borderRadius: 200,
    backgroundColor: colors.neutral300
  },
  editIcon:{
    position: 'absolute',
    bottom: verticalScale(5),
    right: 8,
    padding: 5,
    borderRadius: 50,
    backgroundColor: colors.neutral300,
    shadowColor: colors.black,
    shadowOffset:{
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  nameContainer:{
    gap:verticalScale(4),
    alignItems: 'center'
  },
  listIcon:{
    height: verticalScale(40),
    width: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius._15,
    borderCurve: 'continuous',
    backgroundColor: colors.neutral500,
  },
  listItem:{
    marginBottom: verticalScale(17),
  },
  accountOption:{
    marginTop: spacingY._35
  },
  flexRow:{
    flexDirection: 'row',
    alignItems:'center',
    gap: spacingX._10
  }
})