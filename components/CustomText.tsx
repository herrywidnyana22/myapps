import { useTheme } from '@/contexts/themeContext'
import { Text, TextStyle } from 'react-native'
import { CustomTextProps } from '@/types'

const CustomText = ({
    children,
    size,
    color,
    fontWeight= "400",
    style,
    textProps ={}
}: CustomTextProps) => {
    const { colors } = useTheme()
    
    const textStyle: TextStyle ={
        fontSize: size ? size : 18,
        color: color ?? colors.text,
        fontWeight
    }

    return (
        <Text
            {...textProps}
            style={[textStyle, style]}
        >
            { children }
        </Text>
    )
}

export default CustomText