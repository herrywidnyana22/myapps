import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Banknote } from 'lucide-react-native'
import CustomText from './CustomText'
import { colors, radius, spacingX } from '@/styles/themes'
import { toLabelIdr } from '@/utils/idrFormater'

type TotalAmountLabelType={
    totalAmount: number
}

const TotalAmountLabel = ({totalAmount}: TotalAmountLabelType) => {
    const isTotalAmountNegative = (Number(totalAmount) || 0) < 0 
    return (
        <View style={[styles.totalAmountLabel, {
                backgroundColor: isTotalAmountNegative
                    ? colors.rose 
                    : totalAmount === 0 ? colors.neutralDark : colors.green
                }
            ]}
        >      
            <Banknote
                color={colors.white}
                size={16}
            />   
            <CustomText
                size={14}
                fontWeight={'600'}
            >
                {totalAmount > 0 && "+"}
                {toLabelIdr(totalAmount)}
            </CustomText>
        </View>
    )
}

export default TotalAmountLabel

const styles = StyleSheet.create({
    totalAmountLabel:{
        flexDirection: 'row-reverse',
        gap: spacingX._3,
        alignItems: 'center',
        paddingHorizontal: spacingX._10,
        paddingVertical: spacingX._3,
        borderRadius: radius._10,
    },
})