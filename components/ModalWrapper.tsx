import { colors, spacingY } from '@/styles/themes'
import { ModalWrapperProps } from '@/types'
import { verticalScale } from '@/utils/style'
import { Platform, StyleSheet, Text, View } from 'react-native'

const ios = Platform.OS = 'ios'

const ModalWrapper = ({
    children,
    style,
    bg=colors.neutral800
}:ModalWrapperProps) => {
    
    return (
        <View style={[styles.container, {backgroundColor: bg}, style && style]}>
            { children }
        </View>
    )
}

export default ModalWrapper

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: ios ? spacingY._15 : 20,
        paddingBottom: ios ? verticalScale(80) : spacingY._10,
    }
})