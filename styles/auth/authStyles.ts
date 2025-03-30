import { StyleSheet } from 'react-native'
import { verticalScale } from '@/utils/style';
import { spacingX, spacingY } from "@/styles/themes";

export const welcomeStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            justifyContent: 'space-between',
            paddingTop: spacingY._7
        },
        welcomeImage:{
            width: '100%',
            height: verticalScale(300),
            alignSelf: 'center',
            marginTop: verticalScale(100)
        },
        loginButton:{
            alignSelf: 'flex-end',
            marginRight: spacingX._20
        },
        footer:{
            backgroundColor: colors.neutral900,
            alignItems: 'center',
            paddingTop: verticalScale(30),
            paddingBottom: verticalScale(45),
            gap: spacingY._20,
            shadowColor: 'white',
            shadowOffset:{
                width: 0,
                height: -10
            },
            shadowOpacity: 0.15,
            shadowRadius: 25,
            elevation: 10,
        },
        buttonContainer:{
            width: '100%',
            paddingHorizontal: spacingX._25
        }
    })
}

export const loginStyles = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            gap: spacingY._30,
            paddingHorizontal: spacingX._20
        },
        welcomeText:{
            fontSize: verticalScale(20),
            fontWeight: 'bold',
            color: colors.text
        },
        form:{
            gap: spacingX._20
        },
        forgotPass:{
            textAlign: 'right',
            fontWeight: '500',
            color: colors.text
        },
        footer:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5
        },
        footerText:{
            textAlign: 'center',
            color: colors.text,
            fontSize: verticalScale(15)
        }
    })
}

export const registerStyle = (colors: any) =>{
    return StyleSheet.create({
        container:{
            flex: 1,
            gap: spacingY._30,
            paddingHorizontal: spacingX._20
        },
        welcomeText:{
            fontSize: verticalScale(20),
            fontWeight: 'bold',
            color: colors.text
        },
        form:{
            gap: spacingX._20
        },
        forgotPass:{
            textAlign: 'right',
            fontWeight: '500',
            color: colors.text
        },
        footer:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5
        },
        footerText:{
            textAlign: 'center',
            color: colors.text,
            fontSize: verticalScale(15)
        }
    })
}