import { StyleSheet } from 'react-native'
import { radius, spacingX, spacingY } from "@/styles/themes";

export const barChartVersusStyle = (colors: any) =>{
    return StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: 'column',
            gap: spacingY._5
        },
        labelContainer: {
            position: 'relative',
            flexDirection: "row",
            justifyContent: "space-between",
        },
        barLabel:{
            flexDirection:'row', 
            gap: spacingX._3,
            alignItems:'center',
            justifyContent: 'space-between',
        },
        label: {
            fontWeight: "bold",
            color: colors.neutral200
        },
        barContainer: {
            flexDirection: "row",
            height: 15,
            backgroundColor: colors.neutral200,
            borderRadius: radius._10,
            overflow: "hidden",
            justifyContent: 'space-between'
        },
        expenseBar: {
            height: "100%",
            backgroundColor: colors.rose,
            paddingVertical: 1, 
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        incomeBar: {
            height: "100%",
            backgroundColor: colors.primary,
            justifyContent: 'center',
            paddingVertical: 1, 
            alignItems: 'flex-end'
        },
    })
}