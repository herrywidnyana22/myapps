import { useTheme } from '@/contexts/themeContext'
import { spacingY } from '@/styles/themes'
import { ModalWrapperProps } from '@/types'
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'

const ios = Platform.OS = 'ios'

const ModalWrapper = ({
    children,
    style,
    bg
}:ModalWrapperProps) => {
    const { colors } = useTheme()
    
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            paddingTop: ios ? spacingY._15 : 20,
            paddingBottom: ios ? spacingY._50 : spacingY._10,
        }
    })
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1}}
        >
            <View style={[styles.container, {backgroundColor: bg ?? colors.neutral800}, style && style]}>
                { children }
            </View>
        </KeyboardAvoidingView>
    )

}

export default ModalWrapper

