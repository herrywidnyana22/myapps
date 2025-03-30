import { View } from 'react-native'
import { useRouter } from 'expo-router';
import { Timestamp } from 'firebase/firestore';
import { FlashList } from '@shopify/flash-list'
import { verticalScale } from '@/utils/style'
import { spacingX } from "@/styles/themes";
import { getTotalExpenseIncome } from '@/utils/getAmount';
import { TransactionListType, TransactionType } from '@/types'

import Loading from './Loading'
import CustomText from './CustomText'
import TransactionItem from './TransactionItem'
import TotalAmountLabel from './TotalAmountLabel';
import { useTheme } from '@/contexts/themeContext';
import { transactionStyles } from '@/styles/tabs/tabStyles';

const TransactionList = ({
    data, 
    title,
    isLoading,
    emptyListMessage
}:TransactionListType) => {

    const router = useRouter()
    const { colors } = useTheme()
    const styles = transactionStyles(colors)

    const onClick = (item: TransactionType) =>{
        router.push({
            pathname: "/(modals)/transactionModal",
            params:{
                id: item?.id,
                uid: item?.uid,
                walletId: item?.walletId,
                type: item?.type,
                amount: item?.amount.toString(),
                category: item?.category,
                date: (item.date as Timestamp)?.toDate()?.toISOString(),
                description: item?.description,
                image: JSON.stringify(item?.image),
            }
        })
    }

    const {totalExpense, totalIncome} = getTotalExpenseIncome(data)
    const totalAmount = totalIncome - totalExpense
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    title && (
                    <CustomText
                        size={verticalScale(20)}
                        fontWeight={'500'}
                        style={styles.title}
                    >
                        { title }
                    </CustomText>
                )}
                   <TotalAmountLabel totalAmount={totalAmount}/>
                </View>
                <View style={data.length !== 0 ? styles.list : {minHeight: verticalScale(5)}}>
                    <FlashList
                        data={data}
                        estimatedItemSize={60}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item, index}) => (
                            <TransactionItem
                                item={item}
                                index={index}
                                onClick={onClick}
                            />
                        )}
                    />
                </View>
            {
                !isLoading && data.length == 0 && (
                    <CustomText
                        size={verticalScale(15)}
                        color={colors.neutral400}
                        style={{ textAlign: 'center', marginTop: spacingX._15}}
                    >
                        { emptyListMessage }
                    </CustomText>
                )
            }
            {
                isLoading && (
                    <View style={{top: verticalScale(100)}}>
                        <Loading/>
                    </View>
                )
            }

        </View>
    )
}

export default TransactionList




