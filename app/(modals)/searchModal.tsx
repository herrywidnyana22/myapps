import { Trash2 } from 'lucide-react-native'
import { useAuth } from '@/contexts/authContext'
import { useTheme } from '@/contexts/themeContext'
import { spacingX, spacingY } from '@/styles/themes'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

import Input from '@/components/Input'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import CustomText from '@/components/CustomText'
import ModalWrapper from '@/components/ModalWrapper'
import useTransactionsWithWallets from '@/hooks/useTransactionsWithWallet'
import { limit, orderBy, Timestamp, where } from 'firebase/firestore'
import TransactionList from '@/components/TransactionList'
import { GroupedTransactionType, TransactionType, TransactionWithWalletType } from '@/types'
import { transformTransactions } from '@/utils/common'
import { AgendaList, CalendarProvider } from 'react-native-calendars'
import TransactionItemSecondary from '@/components/TransactionItemSecondary'
import { getTotalExpenseIncome } from '@/utils/getAmount'
import AgendaListHeader from '@/components/AgendaListHeader'
import TitleWithLine from '@/components/TitleWithLine'
import TotalAmountLabel from '@/components/TotalAmountLabel'
import { verticalScale } from '@/utils/style'
import Loading from '@/components/Loading'
import { searchModalStyle } from '@/styles/modals/modalStyles'

const SearchModal = () => {
    const [search, setSearch] = useState('')

    const { user } = useAuth()
    const router = useRouter()

    const { colors } = useTheme()
    const styles = searchModalStyle(colors)

    const { data, isLoading } = 
        useTransactionsWithWallets("transactions", 
        [
            where("uid", "==", user?.uid),
            orderBy("date", "desc"),
            limit(30)
        ])
    const transactions: GroupedTransactionType[] = data?.length 
        ? transformTransactions(data) 
        : []
        
    const renderAgenda = ({ item, index }: { item: TransactionWithWalletType; index: number }) => {
        
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
        return (
            <TransactionItemSecondary
                key={item.id}
                item={item}
                index={index}
                onClick={onClick}
            />
        )
    }

    const renderSectionHeader = (title: any) => {
        const date = title as unknown as string
        const transactionByDate = transactions.find((s) => s.title === date)

        if (!transactionByDate) return null

        const { 
            totalExpense: dailyExpense, 
            totalIncome:dailyIncome 
        } = getTotalExpenseIncome(transactionByDate?.data)

        return (
            <View style={{ marginTop: spacingY._20 }}>
                <AgendaListHeader
                    date={date}
                    transactionsLength={transactionByDate?.data.length ?? 0}
                    totalAmount={ dailyIncome - dailyExpense}
    
                />
            </View>
        )
    }

    const filterTransactions = useMemo(() => {
        if (!search.trim()) return [];

        return transactions
            .map((group) => {
                const filteredData = group.data.filter((item) =>
                    item.type?.toLowerCase().includes(search.toLowerCase())
                    || item.description?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
                    || item.type?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
                )

                return filteredData.length > 0
                    ? { ...group, data: filteredData }
                    : null;
                })
            .filter(Boolean) as GroupedTransactionType[]

    }, [search, transactions])

    const flattenedData = useMemo(() => {
        return filterTransactions.length > 0
            ? filterTransactions.flatMap(group => group.data)
            : []
    }, [filterTransactions])

    const { totalExpense, totalIncome } = getTotalExpenseIncome(flattenedData)
    const totalAmount = totalIncome - totalExpense
    
    return (
        <ModalWrapper style={{backgroundColor: colors.neutral900}}>
            <View style={styles.container}>
                <Header
                    title={"Search"}
                    leftIcon={<BackButton/>}
                    style={{marginBottom: spacingY._10}}
                />
                
                {
                    !isLoading && filterTransactions.length === 0 
                    ? (
                        <CustomText
                            size={verticalScale(15)}
                            color={colors.neutral400}
                            style={{ textAlign: 'center', marginTop: spacingX._15}}
                        >
                            No transaction...!
                        </CustomText>
                    ): (
                        <View style={styles.header}>
                            <TitleWithLine title={"Result"}/>
                            <TotalAmountLabel totalAmount={totalAmount}/>
                        </View>
                    )
                }
                {
                    isLoading && (
                        <View style={{top: verticalScale(100)}}>
                            <Loading/>
                        </View>
                    )
                }
                {filterTransactions.length > 0 && (
                    <CalendarProvider
                        date={
                            filterTransactions.length > 0
                                ? filterTransactions[0].title
                                : new Date().toISOString().split('T')[0]
                        }
                    >
                        <AgendaList
                            sections={filterTransactions.length > 0 ? filterTransactions : []}
                            renderItem={renderAgenda}
                            renderSectionHeader={renderSectionHeader}
                            style={{ marginHorizontal: -spacingX._20 }}
                        />
                    </CalendarProvider>
                )}

                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={(value) => setSearch(value)}
                        value={search}
                        placeholder='Search expense or income...'
                        containerStyle={styles.input}
                        placeholderTextColor={colors.neutral400}
                    />
                </View>
            </View>
        </ModalWrapper>
    )
}

export default SearchModal