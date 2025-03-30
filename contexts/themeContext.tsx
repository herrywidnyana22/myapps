import { createContext, useContext } from "react";
import { Appearance, useColorScheme } from "react-native";
import { colors } from "@/styles/themes";

type ThemeType = "light" | "dark";

interface ThemeContextProps {
    theme: ThemeType;
    colors: typeof colors.light;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemTheme = useColorScheme() as ThemeType; // Deteksi mode sistem

    return (
        <ThemeContext.Provider value={{ 
                theme: systemTheme, 
                colors: colors[systemTheme] 
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
