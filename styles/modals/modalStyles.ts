import { StyleSheet } from 'react-native'
import { horizontalScale, verticalScale } from '@/utils/style';
import { radius, spacingX, spacingY } from "@/styles/themes";

export const profileModalStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: spacingY._20,
        },
        footer:{
            flexDirection: 'row',
            gap: horizontalScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacingX._20,
            marginBottom: spacingY._10,
            paddingVertical: spacingY._20,
            borderTopColor: colors.neutral700,
            borderTopWidth: 1
        },
        form:{
            marginTop: spacingY._15,
            gap: spacingY._30
        },
        avatarContainer:{
            position: 'relative',
            alignSelf: 'center'
        },
        avatar:{
            width: verticalScale(130),
            height: verticalScale(130),
            alignSelf: 'center',
            borderRadius: 200,
            borderWidth: 1,
            borderColor: colors.neutral500
        },
        editIcon:{
            position: 'absolute',
            bottom: spacingY._5,
            right: spacingY._7,
            padding: spacingY._7,
            borderRadius: 100,
            backgroundColor: colors.neutral100,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 4,
        },
        inputContainer:{
            gap: spacingY._10
        }
    })
}

export const transactionModalStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: spacingY._20,
        },
        footer:{
            flexDirection: 'row',
            gap: horizontalScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacingX._20,
            marginBottom: spacingY._10,
            paddingVertical: spacingY._20,
            borderTopColor: colors.neutral700,
            borderTopWidth: 1
        },
        form:{
            gap: spacingY._20,
            marginTop: spacingY._15,
        },
        inputContainer:{
            gap: spacingY._10,
        },
        iosDropDown:{
            height: verticalScale(54),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: verticalScale(14),
            color: colors.white,
            borderColor: colors.neutral300,
            borderWidth: 1,
            borderRadius: radius._17,
            borderCurve: 'continuous',
            paddingHorizontal: spacingX._15
        },
        androidDropDown:{
            height: verticalScale(54),
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: verticalScale(14),
            color: colors.white,
            borderColor: colors.neutral300,
            borderWidth: 1,
            borderRadius: radius._17,
            borderCurve: 'continuous',
            paddingHorizontal: spacingX._15
        },
        flexRow:{
            flexDirection:'row',
            gap: spacingX._5,
            alignItems: 'center',
        },
        dateInput:{
            height: verticalScale(54),
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: radius._17,
            borderColor: colors.neutral300,
            borderCurve: 'continuous',
            paddingHorizontal: spacingX._15
        },
        iosDatePicker:{
            
        },
        datePickerButton:{
            height: verticalScale(35),
            alignItems: 'center',
            justifyContent:'center',
            padding: spacingY._7,
            paddingHorizontal: spacingY._15,
            marginRight: spacingX._7,
            backgroundColor: colors.neutral700,
            borderRadius: radius._15,
        },
        dropDownContainer:{
            height: verticalScale(54),
            borderWidth: 1,
            borderColor: colors.neutral300,
            paddingHorizontal: spacingY._15,
            borderRadius: radius._15,
            borderCurve: 'continuous',
        },
        dropDownText:{
            color: colors.white,
        },
        dropDownSelectedText:{
            color: colors.white,
            fontSize: verticalScale(14),
        },
        dropDownListContainer:{
            top: 5,
            borderRadius: radius._15,
            borderCurve: 'continuous',
            paddingVertical: spacingY._7,
            borderColor: colors.neutral500,
            shadowColor: colors.black,
            shadowOffset: {
                width: 0,
                height: verticalScale(5)
            },
            opacity: 1,
            shadowRadius: radius._15,
            elevation: 15,
            backgroundColor: colors.neutral900,
        },
        dropDownPlaceholder:{
            color: colors.white
        },
        dropDownItemContainer:{
            marginHorizontal: spacingX._7,
            borderRadius: radius._15,
        },
        dropDownItem: {
            flexDirection: "row",
            gap: spacingY._5,
            alignItems: "center",
            paddingVertical: spacingX._15,
            paddingHorizontal: spacingY._15,
        },
        iconContainer: {
            width: horizontalScale(30),
            height: verticalScale(30), 
            borderRadius: radius._10,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: spacingY._7,
        },
        dropDownIcon:{
            height: verticalScale(30),
            tintColor: colors.neutral300,
        },
        descriptionInput:{
            height: verticalScale(100),
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingVertical: spacingX._15,
        },
        deleteButton:{
            backgroundColor: colors.rose,
            paddingHorizontal: spacingX._15,
        }
    })
}

export const walletModalStyle = (colors: any) => {
    return StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: spacingY._20,
        },
        footer:{
            flexDirection: 'row',
            gap: horizontalScale(12),
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: spacingX._20,
            marginBottom: spacingY._10,
            paddingVertical: spacingY._20,
            borderTopColor: colors.neutral700,
            borderTopWidth: 1
        },
        form:{
            marginTop: spacingY._15,
            gap: spacingY._30
        },
        avatarContainer:{
            position: 'relative',
            alignSelf: 'center'
        },
        avatar:{
            width: verticalScale(130),
            height: verticalScale(130),
            alignSelf: 'center',
            borderRadius: 200,
            borderWidth: 1,
            borderColor: colors.neutral500
        },
        editIcon:{
            position: 'absolute',
            bottom: spacingY._5,
            right: spacingY._7,
            padding: spacingY._7,
            borderRadius: 100,
            backgroundColor: colors.neutral100,
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 4,
        },
        inputContainer:{
            gap: spacingY._10
        },
        deleteButton:{
            backgroundColor: colors.rose,
            paddingHorizontal: spacingX._15,
        }
    })
}


export const searchModalStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'space-between',
            paddingHorizontal: spacingX._20,
        },
        header:{
            flexDirection:'row',
            gap: spacingX._7,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: spacingY._10,
        },
        avatarContainer:{
            position: 'relative',
            alignSelf: 'center',
        },
        inputContainer:{
            marginBottom: verticalScale(10),
            paddingVertical: spacingY._20,
        },
        input:{
            backgroundColor: colors.neutral800
        }
    })
}