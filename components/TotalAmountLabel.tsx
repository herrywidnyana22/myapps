import { Banknote } from 'lucide-react-native'
import { toLabelIdr } from '@/utils/idrFormater'
import { StyleSheet, View } from 'react-native'
import { colors, radius, spacingX } from '@/styles/themes'

import CustomText from './CustomText'

type TotalAmountLabelType={
    totalAmount: number
}

const TotalAmountLabel = ({totalAmount}: TotalAmountLabelType) => {

    const styles = StyleSheet.create({
        totalAmountLabel:{
            flexDirection: 'row-reverse',
            gap: spacingX._3,
            alignItems: 'center',
            paddingHorizontal: spacingX._5,
            paddingVertical: spacingX._3,
            borderRadius: radius._10,
        },
    })

    const isTotalAmountNegative = (Number(totalAmount) || 0) < 0 
    return (
        <View style={[styles.totalAmountLabel, {
                backgroundColor: isTotalAmountNegative
                    ? colors.neutral.rose 
                    : totalAmount === 0 ? colors.neutral.neutralDark : colors.neutral.green
                }
            ]}
        >      
            <Banknote
                color={colors.neutral.white}
                size={16}
            />   
            <CustomText
                size={14}
                fontWeight={'600'}
                color={colors.neutral.neutral200}
            >
                {totalAmount > 0 && "+"}
                {toLabelIdr(totalAmount)}
            </CustomText>
        </View>
    )
}

export default TotalAmountLabel