import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, spacingY } from '@/styles/themes';
import { verticalScale } from '@/utils/style';
import { ChartNoAxesCombined, Home, User, Wallet } from 'lucide-react-native';

import CustomText from './CustomText';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps)=> {

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
                            color={colors.white}
                            style={{
                                textTransform:'capitalize', 
                                color: isFocused 
                                    ? colors.primary 
                                    : colors.neutral300,
                                marginTop: spacingY._5
                                
                            }}
                        >
                            {route.name}
                        </CustomText>
                    </TouchableOpacity>
                );
            })
        }
        </View>
    );
}

export default CustomTabBar


const styles = StyleSheet.create({
    tabbar:{
        width: '100%',
        height: Platform.OS == 'ios' ? verticalScale(72) : verticalScale(55),
        flexDirection:'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.neutral800,
        borderTopColor: colors.neutral700,
        borderTopWidth: 1,
    },
    tabbarItem:{
        alignItems:'center',
        justifyContent: 'center',
        marginBottom: Platform.OS == 'ios' ? spacingY._10 : spacingY._5,
    }
})