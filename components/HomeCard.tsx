import { useAuth } from '@/contexts/authContext'
import { WalletType } from '@/types'
import { orderBy, where } from 'firebase/firestore'
import { ArrowDown, ArrowUp, Ellipsis } from 'lucide-react-native'
import { verticalScale } from '@/utils/style'
import { ImageBackground, View } from 'react-native'

import CustomText from './CustomText'
import useData from '@/hooks/useData'
import { toLabelIdr } from '@/utils/idrFormater'
import { useTheme } from '@/contexts/themeContext'
import { homeCardStyle } from '@/styles/styles'

const HomeCard = () => {

    const {user} = useAuth()

    const { colors } = useTheme()
    const styles = homeCardStyle(colors)
    
    const {data: walletData, isLoading: walletLoading, error: walletError} = useData<WalletType>(
        "wallets",
        [
            where("uid", "==", user?.uid),
            orderBy("created", "desc")
        ]
    )

    const getTotalBalance = () =>{
        return walletData.reduce((totals: any, item: WalletType) =>{
            totals.balance += Number(item.amount)
            totals.income += Number(item.totalIncome)
            totals.expense += Number(item.totalExpenses)

            return totals
        }, {
            balance: 0,
            income: 0,
            expense: 0
        })
    }

    return (
        <ImageBackground
            source={require('@/assets/images/card.png')}
            resizeMode='stretch'
            style={styles.bgImage}
        >
            <View style={styles.container} >
                <View>
                    <View style={styles.totalBalance}>
                        <CustomText
                            size={verticalScale(17)}
                            color={colors.neutral800}
                            fontWeight={'500'}
                        >
                            Total Balance
                        </CustomText>
                        <Ellipsis
                            size={verticalScale(23)}
                            strokeWidth={3}
                            color={colors.black}
                        />
                    </View> 
                    <CustomText
                        color={colors.black}
                        size={verticalScale(30)}
                        fontWeight={'bold'}
                    >
                        { walletLoading ? "----" : toLabelIdr(getTotalBalance()?.balance)}
                    </CustomText>  
                </View>

                <View style={styles.stats}>
                    <View style={{ gap: verticalScale(5) }}>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statIcon}>
                                <ArrowDown
                                    size={verticalScale(15)}
                                    color={colors.green}
                                    strokeWidth={3}
                                />
                            </View>
                            <View>
                                <CustomText
                                    size={verticalScale(12)}
                                    color={colors.neutral500}
                                    fontWeight={'500'}
                                >
                                    Total Income
                                </CustomText>
                                <CustomText
                                    size={verticalScale(14)}
                                    color={colors.green}
                                    fontWeight={'600'}
                                >
                                    { walletLoading ? "----" : toLabelIdr(getTotalBalance()?.income)}
                                </CustomText>

                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={styles.incomeExpense}>
                            <View style={styles.statIcon}>
                                <ArrowUp
                                    size={verticalScale(15)}
                                    color={colors.rose}
                                    strokeWidth={3}
                                />
                            </View>
                            <View>
                                <CustomText
                                    size={verticalScale(12)}
                                    color={colors.neutral500}
                                    fontWeight={'500'}
                                >
                                    Total Expense
                                </CustomText>
                                <CustomText
                                    size={verticalScale(14)}
                                    color={colors.rose}
                                    fontWeight={'600'}
                                >
                                    { walletLoading ? "----" : toLabelIdr(getTotalBalance()?.expense)}
                                </CustomText>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default HomeCard