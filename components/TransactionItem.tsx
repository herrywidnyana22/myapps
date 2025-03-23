import { expenseCategories } from '@/constants/data'
import { TransactionItemProps } from '@/types'
import { verticalScale } from '@/utils/style'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles/themes'
import CustomText from './CustomText'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { transactionStyles } from '@/styles/globalStyle'

const TransactionItem = ({
    item,
    index,
    onClick
}: TransactionItemProps) => {
    let category = expenseCategories['utilities']
    const Icon = category.icon
    return (
        <Animated.View 
            entering={ FadeInDown
                .delay(index * 100)
                .springify()
                .damping(14)
            }
        >
            <TouchableOpacity 
                style={transactionStyles.row}
                onPress={() => onClick(item)}
            >
                <View style={[transactionStyles.icon, {backgroundColor: category.bgColor}]}>
                    {
                        Icon && (
                            <Icon
                                size={verticalScale(25)}
                                color={colors.white}
                            />
                        )
                    }
                </View>

                <View style={transactionStyles.categoryDesc}>
                    <CustomText size={verticalScale(17)}>
                        { category.label }
                    </CustomText>
                    <CustomText  
                        color={colors.neutral300}
                        size={verticalScale(13)}
                        textProps={{numberOfLines: 1}}
                    >
                        { 'coba aja deh' }
                    </CustomText>
                </View>

                <View style={transactionStyles.amountDate}>
                    <CustomText
                        color={colors.primary}
                        fontWeight={'500'}
                        size={verticalScale(14)}
                    >
                        + Rp.200.000
                    </CustomText>
                    <CustomText
                        color={colors.neutral300}
                        size={verticalScale(12)}
                    >
                        22 Mar
                    </CustomText>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionItem

const styles = StyleSheet.create({})