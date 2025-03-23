
import { StyleSheet } from 'react-native'
import { colors, radius, spacingX, spacingY } from "@/styles/themes";
import { verticalScale } from '@/utils/style';

export const transactionStyles = StyleSheet.create({
    container:{
        gap: spacingY._17,
    },
    title:{
        color: colors.white,
        marginTop: spacingY._5
    },
    list:{
        minHeight: verticalScale(360),
        paddingBottom: verticalScale(10)
    },
    row:{
        flexDirection: 'row',
        gap: spacingX._12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacingY._12,
        backgroundColor: colors.neutral800,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17
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
        gap:3
    },
})