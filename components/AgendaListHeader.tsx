import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { AgendaListType } from '@/types'
import { toLabelDate } from '@/utils/dateFormater'
import { useTheme } from '@/contexts/themeContext'
import { agendaListtHeaderStyle } from '@/styles/styles'
import { toIdr, toLabelIdr } from '@/utils/idrFormater'

const AgendaListHeader = ({
    date, 
    totalAmount,
    transactionsLength
}: AgendaListType) => {

    const { colors } = useTheme()
    const styles = agendaListtHeaderStyle(colors)

    const isMinus = totalAmount < 0

    return (
        <View style={styles.container}>
            <View>
                <CustomText 
                    size={16}
                    color={colors.neutral200}
                    fontWeight={'bold'}
                >
                    {toLabelDate(date)}
                </CustomText>
                <CustomText 
                    size={12}
                    color={colors.neutral300}
                >
                    Total transaksi: {transactionsLength}
                </CustomText>
            </View>
            <View>
                <CustomText
                    color={
                        isMinus 
                            ? colors.rose 
                            : totalAmount === 0 
                                ? colors.neutral300
                                : colors.primary
                        }
                    fontWeight={'600'}
                    size={16}
                >
                    { totalAmount > 0 && "+" }
                    { totalAmount >= 1000000000 
                            ? toLabelIdr(totalAmount)
                            : toIdr(totalAmount)
                    }
                </CustomText>
            </View>
        </View>
    )
}

export default AgendaListHeader