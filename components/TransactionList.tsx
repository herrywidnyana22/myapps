import { TransactionListType } from '@/types'
import { verticalScale } from '@/utils/style'
import { colors, spacingX } from "@/styles/themes";
import {  View } from 'react-native'
import CustomText from './CustomText'
import { FlashList } from '@shopify/flash-list'
import TransactionItem from './TransactionItem'
import Loading from './Loading'
import { transactionStyles } from '@/styles/globalStyle';

const TransactionList = ({
    data, 
    title,
    isLoading,
    emptyListMessage
}:TransactionListType) => {

    const onClick = () =>{

    }

    return (
        <View style={transactionStyles.container}>
            {
                title && (
                <CustomText
                    size={verticalScale(20)}
                    fontWeight={'500'}
                    style={transactionStyles.title}
                >
                    { title }
                </CustomText>
            )}
            <View style={transactionStyles.list}>
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




