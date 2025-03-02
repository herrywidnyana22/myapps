import { colors } from "@/constants/themes";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const index = () => {
    const router = useRouter()
    
    useEffect(() =>{
        setTimeout(() => {
           router.push("/(auth)/welcome") 
        }, 2000);
    }, [])

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
 
export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral900
    },
    
    logo:{
        height: '20%',
        aspectRatio: 1
    }
})