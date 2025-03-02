import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BackButtonProps } from '@/types'
import { useRouter } from 'expo-router'

import { verticalScale } from '@/utils/style'
import { colors, radius } from '@/constants/themes'
import { ChevronLeft } from 'lucide-react-native'

const BackButton = ({
    style,
    iconSize=26
}:BackButtonProps) => {
    const router = useRouter()

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

const styles = StyleSheet.create({
    button:{
        backgroundColor: colors.neutral600,
        alignSelf: 'flex-start',
        borderRadius: radius._12,
        borderCurve: 'continuous',
        padding: 5
    }
})