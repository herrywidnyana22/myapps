import { StyleSheet, View } from 'react-native'
import { HeaderProps } from '@/types'
import CustomText from './CustomText'
import { useTheme } from '@/contexts/themeContext'

const Header = ({
    title,
    style,
    leftIcon,
    rightIcon
}:HeaderProps) => {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container:{
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftIcon:{
        alignSelf: 'flex-start',
    }
})
  return (
    <View
        style={[styles.container, style]}
    >
      { leftIcon && <View style={styles.leftIcon}>{leftIcon}</View> }
      { title && (
        <CustomText
            size={22}
            fontWeight={'600'}
            color={colors.white}
            style={{
                width: leftIcon ? "82%" : '100%',
                textAlign:'center',
            }}
        >
            {title}
        </CustomText> 
      )}
    </View>
  )
}

export default Header

