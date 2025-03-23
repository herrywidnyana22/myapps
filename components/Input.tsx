import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { InputProps } from '@/types'
import { colors, radius, spacingX } from '@/styles/themes'
import { verticalScale } from '@/utils/style'

const Input = (props: InputProps) => {
    return (
        <View
            style={[styles.container, props.containerStyle && props.containerStyle]}
        >
            { props.icon && props.icon }
            <TextInput
                {...props}
                ref={props.inputRef && props.inputRef}
                placeholderTextColor={colors.neutral400}
                style={[
                    styles.textInput,
                    props.inputStyle && props.inputStyle
                ]}
            />
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        gap: spacingX._10,
        height: verticalScale(54),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.neutral300,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._15
    },
    textInput:{
        flex: 1,
        color: colors.white,
        fontSize: verticalScale(14),
    }
})