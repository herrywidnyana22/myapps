import { View, Pressable, ScrollView } from "react-native";
import CustomText from "./CustomText";
import { useTheme } from "@/contexts/themeContext";
import { filterTabStyle } from "@/styles/tabs/tabStyles";
import { VerticalSegmentedControlProps } from "@/types";

const VerticalSegmentedControl = ({ 
    values, 
    selectedValue,
    onChange 
}:VerticalSegmentedControlProps) => {
    const {colors} = useTheme()
    const styles = filterTabStyle(colors)

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                {values.map((value, index) => (
                    <Pressable
                        key={index}
                        onPress={() => onChange(index)}
                        style={[
                            styles.button,
                            selectedValue.includes(value) ? styles.activeButton : null,  // Check if value is in selectedWallets
                            selectedValue.length === 0 && value === "All" ? styles.activeButton : null
                        ]}
                    >
                        <CustomText
                            size={12}
                            color={
                                selectedValue.includes(value) || (selectedValue.length === 0 && value === "All")
                                    ? colors.neutral800
                                    : colors.neutral200
                            }
                            fontWeight={
                                selectedValue.includes(value) || (selectedValue.length === 0 && value === "All")
                                    ? 'bold'
                                    : 'normal'
                            }
                        >
                            {value}
                        </CustomText>
                    </Pressable>
                ))}
            </View>

        </ScrollView>
    )
}

export default VerticalSegmentedControl
