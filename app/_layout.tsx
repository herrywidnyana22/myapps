import { AuthProvider } from "@/contexts/authContext"
import { ThemeProvider } from "@/contexts/themeContext";
import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler";

const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="(modals)/profileModal"
                options={{
                    presentation:'modal'
                }}
            />
            <Stack.Screen
                name="(modals)/walletModal"
                options={{
                    presentation:'modal'
                }}
            />
            <Stack.Screen
                name="(modals)/transactionModal"
                options={{
                    presentation:'modal'
                }}
            />
        </Stack>
    );
}

export default function RootLayout(){
    return(
       <GestureHandlerRootView style={{flex: 1}}>
            <ThemeProvider>
                <AuthProvider>
                    <StackLayout />
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}
 

