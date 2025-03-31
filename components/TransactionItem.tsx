import * as Haptics from 'expo-haptics';

import { View } from 'react-native';
import { useRef } from 'react';
import { useTheme } from '@/contexts/themeContext';
import { onAction } from '@/services/globalService';
import { Timestamp } from 'firebase/firestore';
import { deleteAlert } from './deleteAlert';
import { verticalScale } from '@/utils/style';
import { deleteTransaction } from '@/services/transactionService';
import { toIdr, toLabelIdr } from '@/utils/idrFormater';
import { TransactionItemProps } from '@/types';
import { Trash2, SquarePen, Wallet } from 'lucide-react-native';
import { expenseCategories, incomeCategory } from '@/constants/data';
import { RectButton } from 'react-native-gesture-handler';

import Animated, { FadeInDown } from 'react-native-reanimated';
import CustomText from './CustomText';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { transactionItemStyles, transactionStyles } from '@/styles/tabs/tabStyles';

const TransactionItem = ({ item, index, onClick }: TransactionItemProps) => {

    const { colors } = useTheme()
    const styles = transactionItemStyles(colors)
    const transactionStyle = transactionStyles(colors)

    let categoryKey = item?.category && item.category !== "" 
        ? item.category 
        : "uncategory"

    let category = item?.type === "income"
        ? incomeCategory[categoryKey]
        : expenseCategories[categoryKey]

    const Icon = category.icon

    const date = (item.date as Timestamp)?.toDate()?.toLocaleDateString("id-ID", {
        weekday: 'short', 
        day: 'numeric',
        month: 'short',
    }).replace(/(\w{3}) (\d{1,2}) (\w{3})/, '$1, $2 $3')

    const swipeableRef = useRef<SwipeableMethods | null>(null);
   
    const onSwipeRight=() =>{
        deleteAlert({
            title: "Confirm",
            desc: "Are you sure to delete this transaction? \nThis action can be undone",
            onConfirm: () => onAction(() => deleteTransaction(item?.id!, item.walletId)),
        })
        swipeableRef.current?.close()            
    }

    const renderRightActions = () => {
        return (

            <View style={styles.actionContainer}>
                <RectButton style={[styles.actionButton, styles.deleteAction]}>
                    <CustomText 
                        size={verticalScale(14)}
                        color={'white'}
                    >
                        Delete
                    </CustomText>
                    <Trash2 size={24} color={'white'} />
                </RectButton>
            </View>
        );
    };

    const renderLeftActions = () => {
        return (
            <View style={styles.actionContainer}>
                <RectButton style={[styles.actionButton, styles.markAsReadAction]}>
                    <SquarePen size={24} color={'white'} />
                    <CustomText 
                        size={verticalScale(14)}
                        color={'white'}
                    >
                        Edit
                    </CustomText>
                </RectButton>
            </View>
        );
    };

    return (
        <Animated.View 
            entering={ FadeInDown
                .delay(index * 100)
                .springify()
                .damping(14)
            }
            style={{ overflow: 'visible' }}
        >
            <View style={{flex: 1}}>
                <ReanimatedSwipeable
                    ref={swipeableRef}
                    friction={2}
                    rightThreshold={100}
                    leftThreshold={80}
                    overshootLeft={false}
                    overshootRight={false}
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                    onSwipeableWillOpen={(direction) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        if (direction === 'left') {
                            onClick(item)
                            swipeableRef.current?.close()
                        }
                        if (direction === 'right') {
                            onSwipeRight()
                        }
                    }}
                >
                    <View style={transactionStyle.walletLabel}>
                        <Wallet
                            size={14}
                            color='white'
                        />
                        <CustomText 
                            size={13}
                            color='white'
                        >
                            { item.walletName}
                        </CustomText>
                    </View>
                    <View style={transactionStyle.row}>
                        <View style={{...transactionStyle.icon, backgroundColor: category.bgColor }}> 
                            {Icon && (
                                <Icon size={25} color="white" />
                            )}
                        </View>

                        <View style={transactionStyle.categoryDesc}>
                            <CustomText size={(17)} color={colors.white}>
                                {item?.description}
                            </CustomText>
                            <CustomText
                                color={colors.neutral400}
                                size={(13)}
                                textProps={{ numberOfLines: 1 }}
                            >
                                {category.label}
                            </CustomText>
                        </View>

                        <View style={transactionStyle.amountDate}>
                            <CustomText
                                color={item?.type === "expense" ? colors.rose : colors.primary}
                                fontWeight={'600'}
                                size={16}
                            >
                                {item?.type === "expense" ? "-" : "+"} { 
                                    item?.amount >= 1000000000 
                                        ? toLabelIdr(item.amount)
                                        : toIdr(item.amount)
                                }
                            </CustomText>
                            <CustomText
                                color={colors.neutral300}
                                size={12}
                            >
                                {date}
                            </CustomText>
                        </View>
                    </View>
                            
                </ReanimatedSwipeable>
            </View>
        </Animated.View>
    )
}

export default TransactionItem
