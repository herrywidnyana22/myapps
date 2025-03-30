import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import { spacingY } from '@/styles/themes'
import { useRouter } from 'expo-router'
import { loginStyles } from '@/styles/auth/authStyles'
import { verticalScale } from '@/utils/style'
import { KeyRound, Mail } from 'lucide-react-native'
import { useRef, useState } from 'react'
import { Alert, Pressable, View } from 'react-native'


import Button from '@/components/Button'
import Input from '@/components/Input'
import CustomText from '@/components/CustomText'
import BackButton from '@/components/BackButton'
import ScreenWrapper from '@/components/ScreenWrapper'

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const {login} = useAuth()

    const {colors} = useTheme()
    const styles = loginStyles(colors)

    const onSubmit = async () =>{
        if(!emailRef.current || !passwordRef.current){
            return Alert.alert("Login", "Please fill all fields...!")
        }

        setIsLoading(true)

        const action = await login(
            emailRef.current,
            passwordRef.current
        )

        setIsLoading(false)
        
        if(!action.success){
            return Alert.alert("Login", action.msg)
        }
    }
    return (
        <ScreenWrapper>
            <View
                style={styles.container}
            >
                <BackButton/>
                <View
                    style={{
                        gap:5,
                        marginTop: spacingY._20
                    }}
                >
                    <CustomText
                        size={30}
                        fontWeight={'800'}
                    >
                        Hey,
                    </CustomText>
                    <CustomText
                        size={30}
                        fontWeight={'800'}
                    >
                        Welcome back
                    </CustomText>
                </View>

                <View style={styles.form}>
                    <CustomText
                        size={16}
                        color={colors.textLighter}
                    >
                        Login now to track all your expenses
                    </CustomText>
                    <Input
                        onChangeText={(value) => (emailRef.current = value)}
                        placeholder='Enter your email'
                        icon={
                            <Mail 
                                size={verticalScale(20)}
                                color={colors.neutral300}
                            />
                        }
                    />
                    <Input
                        onChangeText={(value) => (passwordRef.current = value)}
                        secureTextEntry
                        placeholder='Enter your password'
                        icon={
                            <KeyRound
                                style={{ transform: [{ rotate: '-45deg' }] }}
                                size={verticalScale(20)}
                                color={colors.neutral300}
                            />
                        }
                    />

                    <CustomText
                        size={14}
                        color={colors.text}
                        style={{alignSelf: 'flex-end', marginBottom:verticalScale(15)}}
                    >
                        Forgot password?
                    </CustomText>
                    <Button
                        onPress={onSubmit}
                        isLoading={isLoading}
                    >
                        <CustomText
                            size={20}
                            color={colors.black}
                            fontWeight={'700'}
                        >
                            Login
                        </CustomText>
                    </Button>
                </View>

                <View style={styles.footer}>
                    <CustomText size={15}>
                        Don't have an account?
                    </CustomText>
                    <Pressable onPress={() => router.push("/(auth)/register")}>
                        <CustomText size={15} color={colors.primary} fontWeight={'700'}>
                            Register
                        </CustomText>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login