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
            width: horizontalScale(35),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
            borderCurve: 'continuous',
            backgroundColor: colors.neutral700,
        },
        segmentStyle:{
            height: verticalScale(30),
        },
        secondarySegmentStyle:{
            height: verticalScale(25),
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
            gap: 10,
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
            minHeight: verticalScale(330),
            paddingBottom: Platform.OS == 'ios' ? 72 : 55,
        },
        row:{
            height: verticalScale(65),
            flexDirection: 'row',
            gap: horizontalScale(12),
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
            marginTop: 5,
            padding: 10,
            paddingHorizontal: 10,
            borderRadius: 17,
            backgroundColor: colors.neutral800,
        },
        icon:{
            height: 40,
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 12,
            borderCurve: 'continuous'
        },
        categoryDesc:{
            flex: 1,
            gap: 2.5
        },
        amountDate:{
            alignItems: 'flex-end',
            gap:3,
            marginTop: 12
        },
        walletLabel:{
            position: 'absolute',
            flexDirection: 'row-reverse',
            gap: 3,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 7,
            paddingRight: 10,
            paddingVertical: 2,
            backgroundColor: colors.neutralDark,
            borderRadius: 17,
            borderBottomRightRadius: 0,
            zIndex: 999,
        },
    })
}

export const transactionItemStyles = (colors: any) =>{
    return StyleSheet.create({
        actionContainer: {
            flex: 1,
            height: verticalScale(69),
            justifyContent: 'center',
        },
        actionButton: {
            flex: 1,
            gap: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 17,
            paddingHorizontal: 12,
            marginTop: 6,
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
            paddingRight: 5,
            marginLeft: 5,
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

export const filterTabStyle = (colors: any) =>{
    return StyleSheet.create({
        container: {
            flexDirection: "row", 
            gap: 5,
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
        },
        button: {
            paddingVertical: 5,
            paddingHorizontal: 8,
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.neutral700,
        },
        activeButton: {
            backgroundColor: colors.neutral400,
        },
        text: {
            color: colors.neutral200,
        },
        activeText: {
            fontWeight: "bold",
        },
    })

}