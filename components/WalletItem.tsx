import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomText from './CustomText'
import { WalletType } from '@/types'
import { Router } from 'expo-router'
import { verticalScale } from '@/utils/style'
import { colors, radius, spacingX } from '@/styles/themes'
import { Image } from 'expo-image'
import { ChevronRight } from 'lucide-react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { toIdr } from '@/utils/toIDR'

const WalletItem = ({
    item,
    index,
    router
}:{
    item: WalletType,
    index: number,
    router: Router
}) => {

    const openWallet = () =>{
        router.push({
            pathname: "/(modals)/walletModal",
            params:{
                id: item?.id,
                name: item?.name,
                image: JSON.stringify(item?.image),
            }
        })
    }


    return (
        <Animated.View entering={
            FadeInDown
            .delay(index * 200)
            .springify()
            .damping(13)
        }>
            <TouchableOpacity 
                onPress={openWallet}
                style={styles.container}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={item?.image}
                        contentFit='cover'
                        transition={100}
                        style={{flex: 1}}
                    />
                </View>
                <View style={styles.nameContainer}>
                    <CustomText size={verticalScale(16)}>
                        {item?.name}
                    </CustomText>
                    <CustomText 
                        size={verticalScale(14)}
                        color={colors.neutral400}
                    >
                        {toIdr(item?.amount ?? 0)}
                    </CustomText>
                </View>

                <ChevronRight
                    color={colors.neutral400}
                    size={verticalScale(20)}
                    strokeWidth={2}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}

export default WalletItem

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(17)
    },
    imageContainer:{
        height: verticalScale(45),
        width: verticalScale(45),
        borderRadius: radius._12,
        borderWidth: 1,
        borderColor: colors.neutral600,
        borderCurve: 'continuous',
        overflow: 'hidden'
    },
    nameContainer:{
        flex: 1,
        gap: 2,
        marginLeft: spacingX._10
    }
})