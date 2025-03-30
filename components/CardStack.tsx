import React, { useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { verticalScale } from '@/utils/style';
import Card from './Card';
import { WalletType } from '@/types';

const { width } = Dimensions.get('window');

const CARD_OFFSET = verticalScale(25);
const DRAG_THRESHOLD = width * 0.3;

const CardStack = ({ data }: { data: WalletType[] }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const currentIndex = useSharedValue(0);

    const gestureHandler = useCallback((event: any) => {
        const { translationX, translationY } = event.nativeEvent;
        translateX.value = translationX;
        translateY.value = translationY;
    }, []);

    const endGesture = useCallback(() => {
        if (Math.abs(translateX.value) > DRAG_THRESHOLD) {
            currentIndex.value = (currentIndex.value + 1) % data.length;
        }
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
    }, [data.length]);

    // ✅ Move useAnimatedStyle OUTSIDE of the map function
    const getAnimatedStyle = (index: number) =>
        useAnimatedStyle(() => {
            const isTop = index === currentIndex.value;
            return {
                transform: [
                    { translateX: isTop ? translateX.value : 0 },
                    { translateY: isTop ? translateY.value : -index * CARD_OFFSET },
                    { scale: isTop ? 1 : 0.9 },
                ],
                zIndex: isTop ? 100 : -index,
            };
        }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {data.map((wallet, index) => {
                const animatedStyle = getAnimatedStyle(index); // ✅ Use function instead of calling hook inside map

                return (
                    <PanGestureHandler 
                        key={wallet.id ?? wallet.name} 
                        onGestureEvent={gestureHandler} 
                        onEnded={endGesture}
                    >
                        <Animated.View style={[animatedStyle, { position: 'absolute' }]}>
                            <Card
                                title={wallet.name}
                                totalBalance={wallet.amount ?? 0}
                                totalIncome={wallet.totalIncome ?? 0}
                                totalExpense={wallet.totalExpenses ?? 0}
                            />
                        </Animated.View>
                    </PanGestureHandler>
                );
            })}
        </View>
    );
};

export default CardStack;
