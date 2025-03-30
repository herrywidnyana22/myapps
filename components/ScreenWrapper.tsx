import { Dimensions, Platform, StatusBar, View } from 'react-native'
import { ScreenWrapperProps } from '@/types'
import { useTheme } from '@/contexts/themeContext'

const { height } = Dimensions.get('window')

const ScreenWrapper = ({style, children}: ScreenWrapperProps) => {
    const { colors } = useTheme()
    
    let paddingTop = Platform.OS == 'ios'
    ? height * 0.06
    : 0
  return (
    <View
        style={[{
            paddingTop,
            flex: 1,
            backgroundColor: colors.neutral900

        },style]}
    >
        <StatusBar
            barStyle="light-content"
            backgroundColor={colors.neutral900}
        />
        { children }
    </View>
  )
}

export default ScreenWrapper