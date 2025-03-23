import { ActivityIndicator, ActivityIndicatorProps, View } from 'react-native'
import { colors } from '@/styles/themes'

const Loading = ({
    size="large",
    color= colors.primary
}: ActivityIndicatorProps) => {
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent: 'center'}}>
            <ActivityIndicator
                size={size}
                color={color}
            />
        </View>
    )
}

export default Loading