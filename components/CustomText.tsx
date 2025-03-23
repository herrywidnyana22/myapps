import { Text, TextStyle } from 'react-native'
import { CustomTextProps } from '@/types'
import { colors } from '@/styles/themes'
import { verticalScale } from '@/utils/style'

const CustomText = ({
    children,
    size,
    color= colors.text,
    fontWeight= "400",
    style,
    textProps ={}
}: CustomTextProps) => {

    const textStyle: TextStyle ={
        fontSize: size ? verticalScale(size) : verticalScale(18),
        color,
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