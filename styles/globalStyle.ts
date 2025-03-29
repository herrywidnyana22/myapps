
import { StyleSheet } from 'react-native'
import { verticalScale } from '@/utils/style';
import { colors, radius, spacingX, spacingY } from "@/styles/themes";

export const transactionStyles = StyleSheet.create({
    container:{
        gap: spacingY._15,
    },
    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title:{
        color: colors.white,
    },
    list:{
        minHeight: verticalScale(300),
        paddingBottom: spacingY._10,
    },
    row:{
        flexDirection: 'row',
        gap: spacingX._12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacingY._12,
        marginTop: spacingX._3,
        backgroundColor: colors.neutral800,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17,
    },
    icon:{
        height: verticalScale(44),
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius._12,
        borderCurve: 'continuous'
    },
    categoryDesc:{
        flex: 1,
        gap: 2.5
    },
    amountDate:{
        alignItems: 'flex-end',
        gap:3,
        marginTop: spacingY._12
    },
    walletLabel:{
        position: 'absolute',
        flexDirection: 'row-reverse',
        gap: spacingX._3,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacingY._7,
        paddingRight: spacingY._10,
        paddingVertical: 2,
        backgroundColor: colors.neutralDark,
        borderRadius: radius._17,
        borderBottomRightRadius: 0,
        zIndex: 999,
    },
})