import { colors, spacingX, spacingY } from '@/styles/themes'
import { horizontalScale, verticalScale } from '@/utils/style'
import { ArrowDown, ArrowUp, Ellipsis } from 'lucide-react-native'
import { ImageBackground, StyleSheet, View } from 'react-native'
import CustomText from './CustomText'

const HomeCard = () => {
    return (
        <ImageBackground
            source={require('@/assets/images/card.png')}
            resizeMode='stretch'
            style={styles.bgImage}
        >
            <View style={styles.container} >
                <View>
                    <View style={styles.totalBalance}>
                        <CustomText
                            size={verticalScale(17)}
                            color={colors.neutral800}
                            fontWeight={'500'}
                        >
                            Total Balance
                        </CustomText>
                        <Ellipsis
                            size={verticalScale(23)}
                            strokeWidth={3}
                            color={colors.black}
                        />
                    </View> 
                    <CustomText
                        color={colors.black}
                        size={verticalScale(30)}
                        fontWeight={'bold'}
                    >
                        Rp.123.204.000
                    </CustomText>  
                </View>

                <View style={styles.stats}>
                    <View style={{ gap: verticalScale(5) }}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statIcon}>
                                <ArrowDown
                                    size={verticalScale(15)}
                                    color={colors.black}
                                    strokeWidth={3}
                                />
                            </View>
                            <CustomText
                                color={colors.neutral500}
                                fontWeight={'500'}
                            >
                                Income
                            </CustomText>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <CustomText
                                size={verticalScale(14)}
                                color={colors.green}
                                fontWeight={'600'}
                            >
                                Rp.400.000
                            </CustomText>
                        </View>
                    </View>

                    <View style={{ gap: verticalScale(5) }}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statIcon}>
                                <ArrowUp
                                    size={verticalScale(15)}
                                    color={colors.black}
                                    strokeWidth={3}
                                />
                            </View>
                            <CustomText
                                color={colors.neutral500}
                                fontWeight={'500'}
                            >
                                Expense
                            </CustomText>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <CustomText
                                size={verticalScale(14)}
                                color={colors.rose}
                                fontWeight={'600'}
                            >
                                Rp.400.000
                            </CustomText>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default HomeCard

const styles = StyleSheet.create({
    container:{
        height: '87%',
        width: '100%',
        padding: spacingX._20,
        paddingHorizontal: horizontalScale(23),
        justifyContent: 'space-between'
    },
    totalBalance:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacingY._5
    },
    stats:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statIcon:{
        backgroundColor: colors.neutral300,
        padding: spacingY._5,
        borderRadius: 50 
    },
    incomeExpense:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacingY._7
    },
    bgImage:{
        height: horizontalScale(210),
        width: '100%'
    },
})