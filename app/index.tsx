import { useTheme } from "@/contexts/themeContext";
import { indexStyles } from "@/styles/styles";
import { View, Image } from "react-native"

const Index = () => {
    const { colors } = useTheme()
    const styles = indexStyles(colors)
    
    return (
        <View
            style={styles.container}
        >
            <Image
                source={require("@/assets/images/splashImage.png")}
                resizeMode="contain"
                style={styles.logo}
            />
        </View>
    );
}
 
export default Index