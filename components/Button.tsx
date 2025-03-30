import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { colors, radius } from '@/styles/themes'
import { verticalScale } from '@/utils/style'
import Loading from './Loading'
import { useTheme } from '@/contexts/themeContext'

const Button = ({
    style,
    onPress,
    isLoading= false,
    variant= "primary",
    children
}:CustomButtonProps) => {
    const { colors } = useTheme()
    
    const styles = StyleSheet.create({
        button:{        
            borderRadius: radius._17,
            borderCurve: 'continuous',
            height: verticalScale(52),
            justifyContent:'center',
            alignItems: 'center' 
        }, 
    })
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
                    backgroundColor:variant === "primary" 
                        ? isLoading ? 'transparent' : colors.primary 
                        : isLoading ? 'transparent' : colors.rose,
                    borderWidth: isLoading ? 1.5 : 0,
                    borderColor:  variant === "primary"  
                        ? isLoading ? colors.primary : 'transparent'
                        : isLoading ? colors.rose : 'transparent'
                }
            ]}
            onPress={onPress}
        >
            { 
                isLoading
                ? loadingAnimate
                : children 
                
            }
            
        </TouchableOpacity>
    )
}

export default Button
