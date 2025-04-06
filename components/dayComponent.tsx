import { DayComponentType } from "@/types";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { useTheme } from "@/contexts/themeContext";
import { verticalScale } from "@/utils/style";
import { memo, useMemo } from "react";
import { radius } from "@/styles/themes";
import { calendarStyle } from "@/styles/calendar/calendarStyles";
import { areDayComponentEqual } from "@/utils/rendering";

const DayComponent = ({
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
      if (dateString === new Date().toLocaleDateString('en-CA')) return colors.primary

      return colors.neutral200

  }, [state, selectedDay, dateString, colors])

  const isExpenseIncomeExist = expensePercentage > 0 || incomePercentage > 0

  const bgColor = useMemo(() => {

      return selectedDay === dateString 
          ? colors.primary 
          : "transparent"

  }, [selectedDay, dateString, colors])

  const size = useMemo(() =>{
      return isExpenseIncomeExist
          ? 20
          : 32
  },[expensePercentage, incomePercentage])

  const textSize = useMemo(() =>{
      return isExpenseIncomeExist
          ? 14
          : 16
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
                height: size,
                width: size,
            }
        ]}>
          <CustomText 
            size={verticalScale(textSize)} 
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
  )
}

export default memo(DayComponent, areDayComponentEqual)