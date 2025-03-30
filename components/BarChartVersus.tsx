import { View } from "react-native";
import { useTheme } from "@/contexts/themeContext";
import { spacingY } from "@/styles/themes";
import { toLabelIdr } from "@/utils/idrFormater";
import { barChartVersusStyle } from "@/styles/charts/chartStyles";

import CustomText from "./CustomText";

type DataBarType = {
    expense: number;
    income: number;
};

const BarChartVersus = ({ expense, income }: DataBarType) => {
    const { colors } = useTheme()
    const styles = barChartVersusStyle(colors)

    const totalDaily = expense + income;
    const expensePercentage = Math.round((expense / totalDaily) * 1000) / 10;
    const incomePercentage = Math.round((income / totalDaily) * 1000) / 10;

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                <View style={{gap: spacingY._5}}>
                    <CustomText 
                        fontWeight={'500'}
                        color={colors.neutral200}
                    >
                        Expense
                    </CustomText>
                </View>
                 <View style={{gap: spacingY._5, alignItems:'flex-end'}}>
                    <CustomText 
                        fontWeight={'500'}
                        color={colors.neutral200}
                    >
                        Income
                    </CustomText>
                </View>
            </View>

            {/* Bar Chart */}
            <View style={styles.barContainer}>
                <View style={[styles.expenseBar, { 
                    width: `${expensePercentage}%`,
                    paddingLeft: expensePercentage > 0 ? 5 : null,
                }]}>
                    {
                        expensePercentage > 0 && (
                        <CustomText
                            size={expensePercentage < 10 ? expensePercentage : 12} 
                            color={colors.neutral200}
                            fontWeight={'600'}
                        >
                            {`${expensePercentage}%`}
                        </CustomText>
                    )}
                </View>
                <View style={[styles.incomeBar, { 
                    width: `${incomePercentage}%`,
                    paddingRight: incomePercentage > 0 ? 5 : null, 
                }]}>
                    {
                        incomePercentage > 0 && (
                        <CustomText
                            size={incomePercentage < 10 ? incomePercentage : 12} 
                            color={colors.white}
                            fontWeight={'600'}
                        >
                            {`${incomePercentage}%`}
                        </CustomText>
                    )}
                </View>
            </View>
            <View style={styles.labelContainer}>
                <View style={{gap: spacingY._5}}>
                    <View style={styles.barLabel}>
                        <CustomText
                            size={14}
                            color={colors.rose}
                            fontWeight={'600'}
                        >
                            {toLabelIdr(expense)}
                        </CustomText>
                    </View>
                </View>
                 <View style={{gap: spacingY._5, alignItems:'flex-end'}}>
                    <View style={styles.barLabel}>
                        <CustomText
                            size={14}
                            color={colors.primary}
                            fontWeight={'600'}
                        >
                            {toLabelIdr(income)}
                        </CustomText>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BarChartVersus;
