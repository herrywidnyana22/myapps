import { View, Pressable } from "react-native";
import CustomText from "./CustomText";
import { useTheme } from "@/contexts/themeContext";
import { filterTabStyle } from "@/styles/tabs/tabStyles";
import { VerticalSegmentedControlProps } from "@/types";

const VerticalSegmentedControl = ({ 
    values, 
    selectedIndex, 
    onChange 
}:VerticalSegmentedControlProps) => {
    const {colors} = useTheme()
    const styles = filterTabStyle(colors)

    return (
        <View style={styles.container}>
            {values.map((value, index) => (
                <Pressable
                    key={index}
                    onPress={() => onChange(index)}
                    style={[
                        styles.button,
                        selectedIndex === index && styles.activeButton,
                    ]}
                >
                    <CustomText
                        size={12}
                        color={selectedIndex === index ? colors.neutral800 : colors.neutral200}
                        fontWeight={selectedIndex === index ? 'bold' : 'normal'}
                    >
                        {value}
                    </CustomText>
                </Pressable>
            ))}
        </View>
    );
}

export default VerticalSegmentedControl;
