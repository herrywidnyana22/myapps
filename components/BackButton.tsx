import { radius } from '@/styles/themes'
import { useTheme } from '@/contexts/themeContext'
import { useRouter } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { verticalScale } from '@/utils/style'
import { BackButtonProps } from '@/types'
import { StyleSheet, TouchableOpacity } from 'react-native'


const BackButton = ({
    style,
    iconSize=26
}:BackButtonProps) => {
    const router = useRouter()
    const { colors } = useTheme()
    
    const styles = StyleSheet.create({
        button:{
            backgroundColor: colors.neutral600,
            alignSelf: 'flex-start',
            borderRadius: radius._12,
            borderCurve: 'continuous',
            padding: 5
        }
    })

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => router.back()}
        >

            <ChevronLeft
                size={verticalScale(iconSize)}
                color={colors.white}
                strokeWidth={2} 
            />
        </TouchableOpacity>
    )
}

export default BackButton
