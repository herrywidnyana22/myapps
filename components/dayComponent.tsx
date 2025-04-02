import { DayComponentType } from "@/types";
import { TouchableOpacity, View } from "react-native";
import { DateData } from "react-native-calendars";
import CustomText from "./CustomText";
import { useTheme } from "@/contexts/themeContext";
import { calendarStyle } from "@/styles/styles";
import { verticalScale } from "@/utils/style";
import { useMemo, useState } from "react";
import { radius } from "@/styles/themes";

export const DayComponent = ({
  date,
  state,
  selectedDay,
  expenseData,
  incomeData,
  onPress
}: DayComponentType) => {
    if (!date) return null
    
    const { colors } = useTheme()
    const styles = calendarStyle(colors)


    const dateString = date.dateString
    const expensePercentage = expenseData[dateString] || 0
    const incomePercentage = incomeData[dateString] || 0


    const textColor = useMemo(() => {
        if (state === "disabled") return colors.neutral500
        if (selectedDay === dateString) return colors.white
        if (dateString === new Date().toISOString().split("T")[0]) return colors.primary
        return colors.neutral200
    }, [state, selectedDay, dateString, colors])

    const bgColor = useMemo(() => {

        return selectedDay === dateString 
            ? colors.primary 
            : "transparent"

    }, [selectedDay, dateString, colors])

    const sizeSelected = useMemo(() =>{
        return expensePercentage > 0 || incomePercentage > 0
            ? 20
            : 32
    },[expensePercentage, incomePercentage])


  return (
     <TouchableOpacity 
        onPress={() => onPress?.(date)} 
        activeOpacity={0.7}
        style={styles.dayContainer}
    > 
        <View style={[
            styles.dayItem, 
            { 
                backgroundColor: bgColor, 
                height: sizeSelected,
                width: sizeSelected,
            }
        ]}>
          <CustomText 
            size={verticalScale(16)} 
            style={{ color: textColor }}
        >
            {date.day}
          </CustomText>
        </View>
        {(expensePercentage > 0 || incomePercentage > 0) && (
          <View style={styles.barContainer}>
            <View style={[
                styles.expenseBar, 
                { 
                    width: `${expensePercentage}%`,
                    borderTopRightRadius: incomePercentage === 0 ? radius._15 : 0,
                    borderBottomRightRadius: incomePercentage === 0 ? radius._15 : 0, 
                }
            ]}/>
            <View style={[
                styles.incomeBar, 
                { 
                    width: `${incomePercentage}%`,
                    borderTopLeftRadius: expensePercentage === 0 ? radius._15 : 0,
                    borderBottomLeftRadius: expensePercentage === 0 ? radius._15 : 0, 
                }
            ]}/>
          </View>
        )}
    </TouchableOpacity>
  );
};