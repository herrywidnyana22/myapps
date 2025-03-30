import { TextInput, View } from 'react-native'
import { InputProps } from '@/types'
import { useTheme } from '@/contexts/themeContext'
import { inputStyle } from '@/styles/styles'

const Input = (props: InputProps) => {

    const { colors } = useTheme()
    const styles = inputStyle(colors)

    return (
        <View
            style={[styles.container, props.containerStyle && props.containerStyle]}
        >
            { props.icon && props.icon }
            <TextInput
                {...props}
                ref={props.inputRef && props.inputRef}
                placeholderTextColor={colors.neutral400}
                style={[
                    styles.textInput,
                    props.inputStyle && props.inputStyle
                ]}
            />
        </View>
    )
}

export default Input