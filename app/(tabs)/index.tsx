import Button from '@/components/Button'
import CustomText from '@/components/CustomText'
import { auth } from '@/config/firebase'
import { colors } from '@/constants/themes'
import { signOut } from 'firebase/auth'
import { StyleSheet, Text, View } from 'react-native'

const Home = () => {
  const onLogout = async() =>{
    await signOut(auth)
  }

  return (
    <View>
      <Text>Home</Text>
      <Button
        onPress={onLogout}
      >
        <CustomText
          color={colors.black}
        >
          Logout
        </CustomText>
      </Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})