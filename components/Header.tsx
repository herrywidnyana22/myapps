import { StyleSheet, Text, View } from 'react-native'
import { HeaderProps } from '@/types'
import CustomText from './CustomText'

const Header = ({
    title,
    style,
    leftIcon,
    rightIcon
}:HeaderProps) => {
  return (
    <View
        style={[styles.container, style]}
    >
      { leftIcon && <View style={styles.leftIcon}>{leftIcon}</View> }
      { title && (
        <CustomText
            size={22}
            fontWeight={'600'}
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