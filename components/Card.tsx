
import { View } from 'react-native';
import { useTheme } from '@/contexts/themeContext';
import { CardType } from '@/types';
import { cardStyle } from '@/styles/styles';
import { verticalScale } from '@/utils/style';
import { ArrowDown, ArrowUp, Ellipsis } from 'lucide-react-native';

import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import CustomText from './CustomText';
import Animated, { interpolate, runOnJS, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { useState } from 'react';

const Card = ({
    prevId,
    nextId,
    title,
    totalBalance,
    totalExpense,
    totalIncome,
    isLoading= true,
    index,
    currentIndex,
    prevIndex,
    animateValue,
    dataLength,
    setCardActiveID,
}: CardType) => {

    const { colors } = useTheme()
    const styles = cardStyle(colors)

    const CARD_HEIGHT = verticalScale(210)
    const MAX_CARD_ITEM = 4

    const animatedStyle = useAnimatedStyle(() => {
        const yBeforeSwipe = interpolate(
            animateValue.value,
            [index - 1, index, index + 1],
            [20, 1, -30]

        )
        const yAfterSwipe = interpolate(
            animateValue.value,
            [index - 1, index, index + 1],
            [200, 1, -200]

        )

        const scale = interpolate(
            animateValue.value,
            [index - 1, index, index + 1],
            [0.9, 1, 1.1]
        )

        const opacityAfterSwipe = interpolate(
            animateValue.value,
            [index - 1, index, index + 1],
            [1, 1, 0]
        )

        return{
            transform: [
                { 
                    translateY: index === prevIndex.value
                        ? yAfterSwipe
                        : yBeforeSwipe
                    
                }, {
                    scale: scale
                }
            ],
            opacity: index < currentIndex.value + MAX_CARD_ITEM - 1
                ? opacityAfterSwipe
                : index === currentIndex.value + MAX_CARD_ITEM - 1
                    ? withTiming(1)
                    : withTiming(0)
        }
    })


    return (
        <FlingGestureHandler
            key={'down'}
            direction={Directions.DOWN}
            onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                    if(currentIndex.value !== 0){
                        animateValue.value = withTiming((currentIndex.value -= 1))
                        prevIndex.value = currentIndex.value - 1

                        if (prevId) {
                            runOnJS(setCardActiveID)(prevId);
                        }
                    }
                }
            }}
        >
            <FlingGestureHandler
                key={'up'}
                direction={Directions.UP}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        if(currentIndex.value !== dataLength - 1){
                            animateValue.value = withTiming((currentIndex.value += 1))
                            prevIndex.value = currentIndex.value
                            
                            if (nextId) {
                                runOnJS(setCardActiveID)(nextId);
                            }
                        }
                    }
                }}
            >
                <Animated.View 
                    style={[
                        styles.cardContainer, 
                        { 
                            zIndex: dataLength - index,
                            height: CARD_HEIGHT,
                        },
                        animatedStyle
                    ]}
                >
                    <Svg 
                        width="100%"
                        height="100%" 
                        viewBox="0 0 400 250" 
                        style={styles.svgBackground}
                    >
                        <Defs>
                            <LinearGradient 
                                id="grad" 
                                x1="0%" 
                                y1="0%" 
                                x2="100%" 
                                y2="100%"
                            >
                                <Stop 
                                    offset="0%" 
                                    stopColor={colors.neutral500} 
                                    stopOpacity="1" 
                                />
                                <Stop 
                                    offset="100%" 
                                    stopColor={colors.neutral700} 
                                    stopOpacity="1" 
                                />
                            </LinearGradient>
                        </Defs>
                        <Path
                            d={`M 0 ${80 + index * 30} Q 200 ${180 + index * 10} 400 ${190 - index * 40} L 400 250 L 0 250 Z`}
                            fill="url(#grad)"
                        />
                    </Svg>

                    {/* Card Content */}
                    <View style={styles.content}>
                        <View>
                            <View style={styles.totalBalance}>
                                <CustomText 
                                    size={verticalScale(17)} 
                                    color={colors.neutral600} 
                                    fontWeight={'500'}
                                >
                                    {title}
                                </CustomText>
                                <Ellipsis 
                                    size={verticalScale(23)} 
                                    strokeWidth={3} 
                                    color={colors.neutral700} 
                                />
                            </View>
                            <CustomText 
                                color={colors.neutral700} 
                                size={verticalScale(30)} 
                                fontWeight={'bold'}
                            >
                                {
                                    isLoading 
                                        ? "----" 
                                        : totalBalance
                                }
                            </CustomText>
                        </View>

                        <View style={styles.stats}>
                            <View style={styles.statContainer}>
                                <View style={styles.incomeExpense}>
                                    <View style={styles.statIcon}>
                                        <ArrowDown
                                            size={verticalScale(15)}
                                            color={colors.green}
                                            strokeWidth={3}
                                        />
                                    </View>
                                    <View>
                                        <CustomText 
                                            size={verticalScale(12)} 
                                            color={colors.neutral300} 
                                            fontWeight={'500'}
                                        >
                                            Income
                                        </CustomText>
                                        <CustomText 
                                            size={verticalScale(14)} 
                                            color={colors.green} 
                                            fontWeight={'600'}
                                        >
                                            {
                                                isLoading 
                                                ? "----" 
                                                : totalIncome
                                            }
                                        </CustomText>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={styles.incomeExpense}>
                                    <View style={styles.statIcon}>
                                        <ArrowUp
                                            size={verticalScale(15)}
                                            color={colors.rose}
                                            strokeWidth={3}
                                        />
                                    </View>
                                    <View>
                                        <CustomText 
                                            size={verticalScale(12)} 
                                            color={colors.neutral300} 
                                            fontWeight={'500'}
                                        >
                                            Expense
                                        </CustomText>
                                        <CustomText 
                                            size={verticalScale(14)} 
                                            color={colors.rose} 
                                            fontWeight={'600'}
                                        >
                                            {
                                                isLoading 
                                                    ? "----" 
                                                    : totalExpense
                                            }
                                        </CustomText>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>

            </FlingGestureHandler>
        </FlingGestureHandler>
    )
}

export default Card
