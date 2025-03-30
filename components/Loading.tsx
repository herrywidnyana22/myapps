import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'
import { useTheme } from '@/contexts/themeContext'

const Loading = ({
    size="large",
    color
}: ActivityIndicatorProps) => {
    const { colors } = useTheme()
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <ActivityIndicator
                size={size}
                color={color ?? colors.primary}
            />
        </View>
    )
}

export default Loading