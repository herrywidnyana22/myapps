import Button from '@/components/Button'
import CustomText from '@/components/CustomText'
import ScreenWrapper from '@/components/ScreenWrapper'
import { auth } from '@/config/firebase'
import { colors } from '@/constants/themes'
import { useAuth } from '@/contexts/authContext'
import { signOut } from 'firebase/auth'
import { StyleSheet, Text, View } from 'react-native'

const Home = () => {

  const {user} = useAuth()

  const onLogout = async() =>{
    await signOut(auth)
  }

  return (
    <ScreenWrapper>
      <CustomText>
        Home
      </CustomText>
      <Button
        onPress={onLogout}
      >
        <CustomText
          color={colors.black}
        >
          Logout
        </CustomText>
      </Button>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({})