import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import CustomText from "@/components/CustomText";
import { colors, spacingX, spacingY } from "@/constants/themes";
import { verticalScale } from "@/utils/style";
import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"

const Welcome = () => {
    const router = useRouter()

    return (
        <ScreenWrapper>
            <View style={styles.container}>

                <View>
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={() => router.push('/(auth)/login')}
                    >
                        <CustomText
                            fontWeight={'500'}
                            color={colors.primary}
                        >
                            Login
                        </CustomText>
                    </TouchableOpacity>
                    <Animated.Image
                        entering={FadeIn.duration(1000)}
                        source={require('@/assets/images/welcome.png')}
                        style={styles.welcomeImage}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.footer}>
                    <Animated.View 
                        entering={FadeInDown
                            .duration(1000)
                            .springify()
                            .damping(12)
                        }
                        style={{alignItems: 'center'}}
                    >
                        <CustomText
                            size={30}
                            fontWeight={'800'}
                        >
                            Always take control
                        </CustomText>
                        <CustomText
                            size={30}
                            fontWeight={'800'}
                        >
                            of your finances
                        </CustomText>
                    </Animated.View>
                    <Animated.View 
                        entering={FadeInDown
                            .duration(1000)
                            .delay(100)
                            .springify()
                            .damping(12)
                        }
                        style={{alignItems: 'center', gap: 2}}
                    >
                        <CustomText
                            size={17}
                            color={colors.textLight}
                        >
                            Finances mus be arrange to set a better
                        </CustomText>
                        <CustomText
                            size={17}
                            color={colors.textLight}
                        >
                            lifestyle in future
                        </CustomText>
                    </Animated.View >
                    <Animated.View 
                        entering={FadeInDown
                            .duration(1000)
                            .delay(200)
                            .springify()
                            .damping(12)
                        }
                        style={styles.buttonContainer}
                    >
                        <Button onPress={() => router.push('/(auth)/register')}>
                            <CustomText
                                size={22}
                                color={colors.neutral900}
                                fontWeight={"600"}
                            >
                                Get Started
                            </CustomText>
                        </Button>
                    </Animated.View>
                </View>
            </View>
        </ScreenWrapper>

    );
}
 
export default Welcome;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: spacingY._7
    },
    welcomeImage:{
        width: '100%',
        height: verticalScale(300),
        alignSelf: 'center',
        marginTop: verticalScale(100)
    },
    loginButton:{
        alignSelf: 'flex-end',
        marginRight: spacingX._20
    },
    footer:{
        backgroundColor: colors.neutral900,
        alignItems: 'center',
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: 'white',
        shadowOffset:{
            width: 0,
            height: -10
        },
        shadowOpacity: 0.15,
        shadowRadius: 25,
        elevation: 10,
    },
    buttonContainer:{
        width: '100%',
        paddingHorizontal: spacingX._25
    }
})