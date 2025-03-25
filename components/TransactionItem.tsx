import { expenseCategories, incomeCategory } from '@/constants/data';
import { transactionStyles } from '@/styles/globalStyle';
import { colors, radius, spacingX } from '@/styles/themes';
import { TransactionItemProps } from '@/types';
import { verticalScale } from '@/utils/style';
import { Timestamp } from 'firebase/firestore';
import { StyleSheet, View, Alert } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeInDown } from 'react-native-reanimated';
import CustomText from './CustomText';
import { toIdr, toLabelIdr } from '@/utils/idrFormater';
import { Trash2, SquarePen } from 'lucide-react-native';
import { useRef } from 'react';
import * as Haptics from 'expo-haptics';

const TransactionItem = ({ item, index, onClick }: TransactionItemProps) => {
    let categoryKey = item?.category && item.category !== "" ? item.category : "uncategory";
    let category = item?.type === "income"
        ? incomeCategory[categoryKey]
        : expenseCategories[categoryKey];

    const Icon = category.icon;
    const date = (item.date as Timestamp)?.toDate()?.toLocaleDateString("en-GB", {
        day: 'numeric',
        month: 'short',
    })


    const swipeableRef = useRef<SwipeableMethods | null>(null);
    const showDeleteAlert = () =>{
        return Alert.alert(
            "Confirm",
            "Are you sure to delete this transaction? \nThis action can be undo",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                }, {
                    text: "Delete this transaction",
                    // onPress: () => onDelete(),
                    style: "destructive"
                }
            ]
        )
    }


    const renderRightActions = () => {
        return (

            <View style={styles.actionContainer}>
                <RectButton style={[styles.actionButton, styles.deleteAction]}>
                    <CustomText 
                        size={verticalScale(14)}
                        color={colors.neutral200}
                    >
                        Delete
                    </CustomText>
                    <Trash2 size={24} color={colors.white} />
                </RectButton>
            </View>
        );
    };

    const renderLeftActions = () => {
        return (
            <View style={styles.actionContainer}>
                <RectButton style={[styles.actionButton, styles.markAsReadAction]}>
                    <SquarePen size={24} color={colors.white} />
                    <CustomText 
                        size={verticalScale(14)}
                        color={colors.neutral200}
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
        >
            <GestureHandlerRootView>
                <ReanimatedSwipeable
                    ref={swipeableRef}
                    friction={2}
                    rightThreshold={100}
                    leftThreshold={100}
                    overshootLeft={false}
                    overshootRight={false}
                    onSwipeableWillOpen={(direction) => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                        if (direction === 'left') {
                            onClick(item)
                            swipeableRef.current?.close()
                        }
                        if (direction === 'right') {
                            showDeleteAlert()
                            swipeableRef.current?.close()
                        }
                    }}
                    renderLeftActions={
                        renderLeftActions
                    }
                    renderRightActions={renderRightActions}
                >
                    <View style={transactionStyles.row}>
                        <View style={[transactionStyles.icon, { backgroundColor: category.bgColor }]}> 
                            {Icon && (
                                <Icon size={verticalScale(25)} color={colors.white} />
                            )}
                        </View>

                        <View style={transactionStyles.categoryDesc}>
                            <CustomText size={verticalScale(17)}>
                                {item?.description}
                            </CustomText>
                            <CustomText
                                color={colors.neutral400}
                                size={verticalScale(13)}
                                textProps={{ numberOfLines: 1 }}
                            >
                                {category.label}
                            </CustomText>
                        </View>

                        <View style={transactionStyles.amountDate}>
                            <CustomText
                                color={item?.type === "expense" ? colors.rose : colors.primary}
                                fontWeight={'500'}
                                size={verticalScale(14)}
                            >
                                {item?.type === "expense" ? "-" : "+"} { 
                                    item?.amount >= 1000000000 
                                        ? toLabelIdr(item.amount)
                                        : toIdr(item.amount)
                                }
                            </CustomText>
                            <CustomText
                                color={colors.neutral300}
                                size={verticalScale(12)}
                            >
                                {date}
                            </CustomText>
                        </View>
                    </View>
                            
                </ReanimatedSwipeable>
            </GestureHandlerRootView>
        </Animated.View>
    )
}

export default TransactionItem;

const styles = StyleSheet.create({
    actionContainer: {
        flex: 1,
        height: verticalScale(62),
        justifyContent: 'center',
    },
    actionButton: {
        flex: 1,
        gap: spacingX._5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius._17,
        paddingHorizontal: spacingX._12,
    },
    deleteAction: {
        justifyContent: 'flex-end',
        backgroundColor: colors.rose,
    },
    markAsReadAction: {
        alignItems: 'center',
        backgroundColor: colors.green,
    },
    actionText: {
        color: colors.white,
        fontSize: verticalScale(10),
        fontWeight: 'bold',
    },

    actionIcon:{
        paddingRight: spacingX._5,
        marginLeft: spacingX._5,
    }
});
