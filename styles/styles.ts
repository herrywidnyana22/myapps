
import { StyleSheet } from 'react-native'
import { horizontalScale, verticalScale } from '@/utils/style';
import { radius, spacingX, spacingY } from "@/styles/themes";

export const indexStyles = (colors: any) =>{
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.neutral900
        },
        
        logo:{
            height: '20%',
            aspectRatio: 1
        }
    })
}


export const homeCardStyle = (colors: any) =>{
    return StyleSheet.create({
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
}

export const cardStyle = (colors: any) =>{
    return StyleSheet.create({
        cardContainer: {
            position: 'absolute',
            width: '100%',
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: colors.neutral300,
            shadowColor: colors.neutral800,
            shadowOffset: {
                width: 20,
                height: verticalScale(20), // Increase shadow height to make it more visible at the bottom
            },
            shadowOpacity: 0.85, // Increase opacity for stronger shadow
            shadowRadius: radius._20,
            elevation: 10,
        },
        svgBackground: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        },
        content: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            padding: 20,
            justifyContent: 'space-between',
            
        },
        totalBalance: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        stats: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        statContainer: {
            gap: verticalScale(5),
        },
        statIcon:{
            padding: spacingY._5,
            borderRadius: 50 
        },
        incomeExpense: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: verticalScale(7),
        },
    })
}

export const agendaListtHeaderStyle = (colors: any) =>{
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', 
            backgroundColor: colors.neutral700,
            paddingVertical: 8,
            paddingHorizontal: spacingX._20,
        }
    })
}

export const imageUpdaloadStyle = (colors: any) =>{
    return StyleSheet.create({
        inputContainer:{
            height: verticalScale(52),
            backgroundColor: colors.neutral700,
            borderRadius: radius._15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            borderWidth: 1,
            borderColor: colors.neutral500,
            borderStyle: 'dashed'
        },
        image:{
            position: 'relative',
            borderRadius: radius._15,
            borderCurve: 'continuous',
            overflow: 'hidden',
        },
        deleteIcon:{
            position: 'absolute',
            top: horizontalScale(6),
            left: horizontalScale(115),
            shadowColor: colors.black,
            shadowOffset: {width: 0, height: 5},
            shadowOpacity: 1,
            shadowRadius: 10,
            borderRadius: '50%',
            backgroundColor: colors.neutral100,
            padding: 4
        }
    })
}

export const inputStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flexDirection: 'row',
            gap: spacingX._10,
            height: verticalScale(54),
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: colors.neutral300,
            borderRadius: radius._17,
            borderCurve: 'continuous',
            paddingHorizontal: spacingX._15
        },
        textInput:{
            flex: 1,
            color: colors.white,
            fontSize: verticalScale(14),
        }
    })
}

export const titleLineStyle = (colors: any) =>{
    return StyleSheet.create({
        leftLine: {
            width: 10, // shorter left line
            height: 1,
            backgroundColor: colors.neutral500,
        },
        rightLine: {
            flex: 1, // fill the rest
            height: 1,
            backgroundColor: colors.neutral500,
        },
        title: {
            marginHorizontal: spacingX._3,
            color: colors.neutral200,
            fontSize: verticalScale(20),
            fontWeight: '500',
        },
    })
}



