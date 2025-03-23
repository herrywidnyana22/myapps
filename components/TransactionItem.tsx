import { expenseCategories, incomeCategory } from '@/constants/data'
import { TransactionItemProps } from '@/types'
import { verticalScale } from '@/utils/style'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors } from '@/styles/themes'
import CustomText from './CustomText'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { transactionStyles } from '@/styles/globalStyle'
import { toIdr, toLabelIdr } from '@/utils/idrFormater'
import { Timestamp } from 'firebase/firestore'

const TransactionItem = ({
    item,
    index,
    onClick
}: TransactionItemProps) => {
    let category = item?.type === "income"
        ? incomeCategory[item.category!]
        : expenseCategories[item.category!]

    const Icon = category.icon
    const date = (item.date as Timestamp)?.toDate()?.toLocaleDateString("en-GB", {
        day: 'numeric',
        month: 'short',
    })

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
                        { item?.description }
                    </CustomText>
                    <CustomText  
                        color={colors.neutral400}
                        size={verticalScale(13)}
                        textProps={{numberOfLines: 1}}
                    >
                        { category.label }
                    </CustomText>
                </View>

                <View style={transactionStyles.amountDate}>
                    <CustomText
                        color={item?.type === "expense" ? colors.rose : colors.primary}
                        fontWeight={'500'}
                        size={verticalScale(14)}
                    >
                        {
                            item?.type === "expense" 
                            ? "-" 
                            : "+"
                        } { 
                            item?.amount >= 1000000000 
                                ? toLabelIdr(item.amount)
                                : toIdr(item.amount)
                        }  
                    </CustomText>
                    <CustomText
                        color={colors.neutral300}
                        size={verticalScale(12)}
                    >
                        { date }
                    </CustomText>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionItem

const styles = StyleSheet.create({})