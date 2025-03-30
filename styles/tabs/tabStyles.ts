import { Platform, StyleSheet } from 'react-native'
import { horizontalScale, verticalScale } from '@/utils/style';
import { radius, spacingX, spacingY } from "@/styles/themes"


export const homeStyles = (colors: any) =>{
    return StyleSheet.create({
        areaViewContainer:{
            position: 'relative',
            height: verticalScale(230)
        },
        container:{
            position: 'relative',
            flex: 1,
            paddingHorizontal: spacingX._20,
            marginTop: verticalScale(8)
        },
        header:{
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: spacingY._10
        },
        searchIcon:{
            backgroundColor: colors.neutral700,
            padding: spacingX._10,
            borderRadius: 50
        },
        floatingButton:{
            height: verticalScale(50),
            width: verticalScale(50),
            position: 'absolute',
            right: verticalScale(30),
            bottom: verticalScale(30),
            borderRadius: 100,
        },
    })
}

export const walletStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'space-between'
        },
        balanceView:{
            height: verticalScale(160),
            backgroundColor: colors.black,
            justifyContent: 'center',
            alignItems: 'center'
        },
        flexRow:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacingY._10
        },
        wallet:{
            flex: 1,
            backgroundColor: colors.neutral900,
            borderTopRightRadius: radius._30,
            borderTopLeftRadius: radius._30,
            padding: spacingX._20,
            paddingTop: spacingX._25
        },
        list:{
            paddingVertical: spacingX._25,
            paddingTop: spacingY._15
        }, 
        addIcon:{
            backgroundColor: colors.primary, 
            borderRadius:'50%', 
            padding:verticalScale(5)
        }
    })
}

export const statisticStyle = (colors: any) =>{

    return StyleSheet.create({
        container: {
            gap: spacingY._10,
            paddingHorizontal: spacingX._20,
            paddingVertical: spacingY._5,
        },
        scrollContainer:{
            gap: spacingY._10,
            paddingTop: spacingY._5,
            paddingBottom: verticalScale(100)
        },
        chartContainer:{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
        },
        chartLoadingContainer:{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: radius._12,
            backgroundColor: colors.neutral800,
        },
        header:{

        },
        noChart:{
            height: verticalScale(210),
            backgroundColor: colors.neutral800,
        },
        searchIcon:{
            height: verticalScale(35),
            width: verticalScale(35),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            borderCurve: 'continuous',
            backgroundColor: colors.neutral700,
        },
        segmentStyle:{
            height: horizontalScale(37),
        },
        segmentFontStyle:{
            fontSize: verticalScale(13),
            fontWeight: 'bold',
            color: colors.black,
        }
    })
}

export const profileStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            paddingHorizontal: spacingX._20
        },
        userInfo:{
            alignItems: 'center',
            gap: spacingY._15,
            marginTop: verticalScale(30),
        },
        avatar:{
            height: verticalScale(135),
            width: verticalScale(135),
            alignSelf: 'center',
            borderRadius: 200,
            backgroundColor: colors.neutral300
        },
        editIcon:{
            position: 'absolute',
            bottom: verticalScale(5),
            right: 8,
            padding: 5,
            borderRadius: 50,
            backgroundColor: colors.neutral300,
            shadowColor: colors.black,
            shadowOffset:{
            height: 0,
            width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 4,
        },
        nameContainer:{
            gap:verticalScale(4),
            alignItems: 'center'
        },
        listIcon:{
            height: verticalScale(40),
            width: verticalScale(40),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: radius._15,
            borderCurve: 'continuous',
            backgroundColor: colors.neutral500,
        },
        listItem:{
            marginBottom: verticalScale(17),
        },
        accountOption:{
            marginTop: spacingY._35
        },
        flexRow:{
            flexDirection: 'row',
            alignItems:'center',
            gap: spacingX._10
        }
    })
}

export const transactionStyles = (colors: any) => {
    return StyleSheet.create({
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
            minHeight: verticalScale(320),
            paddingBottom: Platform.OS == 'ios' ? verticalScale(72) : verticalScale(55),
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
}

export const transactionItemStyles = (colors: any) =>{
    return StyleSheet.create({
        actionContainer: {
            flex: 1,
            height: verticalScale(62),
            justifyContent: 'center',
            marginTop: spacingY._5,
        },
        actionButton: {
            flex: 1,
            gap: spacingX._5,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: radius._17,
            paddingHorizontal: spacingX._12,
        },
        deleteAction: {
            justifyContent: 'flex-end',
            backgroundColor: colors.rose,
        },
        markAsReadAction: {
            alignItems: 'center',
            backgroundColor: colors.green,
        },
        actionText: {
            color: colors.white,
            fontSize: 10,
            fontWeight: 'bold',
        },

        actionIcon:{
            paddingRight: spacingX._5,
            marginLeft: spacingX._5,
        }
    });
}

export const tabBarStyle = (colors: any) =>{
    return StyleSheet.create({
        tabbar:{
            width: '100%',
            height: Platform.OS == 'ios' ? verticalScale(72) : verticalScale(55),
            flexDirection:'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: colors.neutral800,
            borderTopColor: colors.neutral700,
            borderTopWidth: 1,
        },
        tabbarItem:{
            alignItems:'center',
            justifyContent: 'center',
            marginBottom: Platform.OS == 'ios' ? spacingY._10 : spacingY._5,
        }
    })
}