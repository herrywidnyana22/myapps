import { View, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "./CustomText";
import { useTheme } from "@/contexts/themeContext";
import { filterTabStyle } from "@/styles/tabs/tabStyles";
import { VerticalSegmentedControlProps } from "@/types";
import Animated, { FadeInDown } from "react-native-reanimated";
import { verticalScale } from "@/utils/style";

const VerticalSegmentedControl = ({ 
    values, 
    selectedValue,
    onChange 
}:VerticalSegmentedControlProps) => {
    const {colors} = useTheme()
    const styles = filterTabStyle(colors)

    return (
    <View style={{ maxHeight: verticalScale(25) }}>
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }} 
        >
            <View style={styles.container}>
                {
                    values.map((value, index) => (
                        <Animated.View 
                            key={index}
                            entering={ FadeInDown
                                .delay(index * 100)
                                .springify()
                                .damping(14)
                            }
                        >
                            <TouchableOpacity
                                key={index}
                                onPress={() => onChange(value)}
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
                            </TouchableOpacity>
                    
                        </Animated.View>
                ))}
            </View>

        </ScrollView>
    </View>
    )
}

export default VerticalSegmentedControl
