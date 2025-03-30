import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { spacingY } from '@/styles/themes';
import { verticalScale } from '@/utils/style';
import { ChartNoAxesCombined, Home, User, Wallet } from 'lucide-react-native';

import { useTheme } from '@/contexts/themeContext';
import { tabBarStyle } from '@/styles/tabs/tabStyles';

import CustomText from './CustomText';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps)=> {

    const { colors } = useTheme()
    const styles = tabBarStyle(colors)

    const tabIcons: any ={
        index: (isFocused: boolean) =>(
            <Home
                size={verticalScale(25)}
                color={isFocused ? colors.primary : colors.neutral300}
            />
        ),
        statistic: (isFocused: boolean) =>(
            <ChartNoAxesCombined
                size={verticalScale(25)}
                color={isFocused ? colors.primary : colors.neutral300}
            />
        ),
        wallet: (isFocused: boolean) =>(
            <Wallet
                size={verticalScale(25)}
                color={isFocused ? colors.primary : colors.neutral300}
            />
        ),
        profile: (isFocused: boolean) =>(
            <User
                size={verticalScale(25)}
                color={isFocused ? colors.primary : colors.neutral300}
            />
        ),
    }
    return (
        <View style={styles.tabbar}>
        {
            state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const label = options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined 
                                ? options.title
                                : route.name

                const isFocused = state.index === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabbarItem}
                    >
                        { tabIcons[route.name] && tabIcons[route.name](isFocused) }
                        <CustomText 
                            size={11}
                            style={{
                                textTransform:'capitalize', 
                                marginTop: spacingY._5,
                                color: isFocused 
                                    ? colors.primary 
                                    : colors.neutral300,
                                
                            }}
                        >
                            {route.name == 'index' ? "Home" : route.name}
                        </CustomText>
                    </TouchableOpacity>
                );
            })
        }
        </View>
    );
}

export default CustomTabBar