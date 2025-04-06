
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { radius, spacingX, spacingY } from "@/styles/themes";
import { verticalScale } from '@/utils/style';

const { height } = Dimensions.get('window')

let paddingTop = Platform.OS == 'ios'
    ? height * 0.06
    : 0

export const calendarStyle =(colors: any) =>{
    return StyleSheet.create({
        container: {
            // flex:1,
            // borderRadius: radius._17,
            // overflow: 'hidden',
            // backgroundColor: colors.neutral900,

            // custom
            marginHorizontal: -spacingX._20,
        },
        agendaContainer:{
            height: height,
            marginHorizontal: -spacingX._20, 
            marginVertical: -spacingY._5,
            // marginHorizontal: -spacingX._20,
            // paddingVertical: paddingTop,
            // paddingHorizontal: spacingX._20,
        },
        dayContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 32,
            height: 32,
            borderRadius: '50%',
        },
        dayItem:{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
        },
        barContainer: {
            flexDirection: 'row',
            height: 6,
            paddingHorizontal: 5,
            borderRadius: radius._10,
            marginTop: 1,
        },
        expenseBar: {
            height: '100%',
            backgroundColor: colors.rose,
            borderTopLeftRadius: radius._15,
            borderBottomLeftRadius: radius._15, 
        },
        incomeBar: {
            height: '100%',
            backgroundColor: colors.primary,
            borderTopRightRadius: radius._15,
            borderBottomRightRadius: radius._15,
        },
    })
}