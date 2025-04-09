import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { TransactionItemProps } from '@/types'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useTheme } from '@/contexts/themeContext'
import { expenseCategories, incomeCategory } from '@/constants/data'
import { getAmPmHour } from '@/utils/dateFormater'
import CustomText from './CustomText'
import { spacingX } from '@/styles/themes'
import { Wallet } from 'lucide-react-native'
import { verticalScale } from '@/utils/style'
import { toIdr, toLabelIdr } from '@/utils/idrFormater'
import { transactionItemSecondaryStyle } from '@/styles/tabs/tabStyles'
import testIDs from '@/constants/testIDs'
import { areTransactionPropsEqual } from '@/utils/rendering'

const TransactionItemSecondary = ({ 
    item, 
    index, 
    onClick 
}: TransactionItemProps) => {
    const { colors } = useTheme()
    const styles = transactionItemSecondaryStyle(colors)

    let categoryKey = item?.category && item.category !== "" 
            ? item.category 
            : "uncategory"
    
    let category = item?.type === "income"
        ? incomeCategory[categoryKey]
        : expenseCategories[categoryKey]

    const Icon = category.icon

    const categoryBg = { backgroundColor: category.bgColor }
    const {hour, ampm} = getAmPmHour(item.date)

    return (
        <Animated.View
            testID={testIDs.agenda.ITEM}
            entering={ FadeInDown
                .delay(index * 100)
                .springify()
                .damping(14)
            }
        >
            <View style={styles.container}>
                {/* timehour */}
                <View style={styles.hourLabel}>
                    <CustomText
                        size={verticalScale(25)}
                        color={colors.neutral400}
                        fontWeight={'500'}
                    >
                        {hour}
                    </CustomText>
                    <CustomText
                        size={16}
                        color={colors.neutral500}
                        fontWeight={300}
                    >
                        {ampm}
                    </CustomText>
                </View>

                
                <TouchableOpacity 
                    onPress={() => onClick}
                    style={styles.itemContainer}
                >
                    <View style={styles.detailContainer}>
                        <CustomText
                            size={16}
                            color={colors.neutral200}
                            fontWeight={500}
                        >
                            {item.description}
                        </CustomText>
                        <CustomText
                            size={14}
                            color={colors.neutral500}
                            style={{textTransform: 'capitalize'}}
                        >
                            {item.category}
                        </CustomText>
                        <View style={styles.walletLabel}>
                            <Wallet
                                color={colors.neutral400}
                                size={14}
                            />
                            <CustomText
                                size={12}
                                color={colors.neutral400}
                                fontWeight={400}
                            >
                                {item.walletName}
                            </CustomText>
                        </View>

                    </View>
                    <View style={styles.amount}>
                        <View style={[styles.icon, categoryBg]}> 
                            {Icon && (
                                <Icon 
                                    size={20} 
                                    color="white"
                                />
                            )}
                        </View>
                        <View>
                            <CustomText
                                color={item?.type === "expense" ? colors.rose : colors.primary}
                                fontWeight={'500'}
                                size={14}
                            >
                                {item?.type === "expense" ? "-" : "+"} { 
                                    item?.amount >= 1000000000 
                                        ? toLabelIdr(item.amount)
                                        : toIdr(item.amount)
                                }
                            </CustomText>
                        </View>

                    </View>

                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default memo(TransactionItemSecondary, areTransactionPropsEqual)