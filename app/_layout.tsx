import { AuthProvider } from "@/contexts/authContext"
import { ThemeProvider } from "@/contexts/themeContext";
import { Stack } from "expo-router"
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";


// Configure Reanimated Logger before rendering anything
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

LogBox.ignoreLogs([
  "Warning: ExpandableCalendar: Support for defaultProps will be removed",
])

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
    )
}

export default function RootLayout(){
    return(
       <GestureHandlerRootView>
            <ThemeProvider>
                <AuthProvider>
                    <StackLayout />
                </AuthProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}
 

