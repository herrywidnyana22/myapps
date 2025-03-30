import Button from "@/components/Button";
import CustomText from "@/components/CustomText";
import ScreenWrapper from "@/components/ScreenWrapper";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated"

import { useTheme } from "@/contexts/themeContext"
import { useRouter } from "expo-router";
import { welcomeStyle } from "@/styles/auth/authStyles";
import { View, TouchableOpacity } from "react-native";

const Welcome = () => {
    const router = useRouter()

    const { colors } = useTheme()
    const styles = welcomeStyle(colors)

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
 
export default Welcome