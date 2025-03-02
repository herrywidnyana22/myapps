import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { colors, radius } from '@/constants/themes'
import { verticalScale } from '@/utils/style'
import Loading from './Loading'

const Button = ({
    style,
    onPress,
    loading= false,
    children
}:CustomButtonProps) => {
    const loadingAnimate = (
        <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
            <Loading size={'small'}/>
        </View>
    )

    return (
        <TouchableOpacity
            style={[
                styles.button, 
                style, 
                {
                    backgroundColor: loading ? 'transparent' : colors.primary,
                    borderWidth: loading ? 1.5 : 0,
                    borderColor: loading ? colors.primary : 'transparent'
                }
            ]}
            onPress={onPress}
        >
            { 
                loading
                ? loadingAnimate
                : children 
                
            }
            
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button:{        
        borderRadius: radius._17,
        borderCurve: 'continuous',
        height: verticalScale(52),
        justifyContent:'center',
        alignItems: 'center' 
    }, 
})