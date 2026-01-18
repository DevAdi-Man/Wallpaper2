import { useEffect, useRef } from "react"
import { Dimensions, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { Space } from "@/src/components/space";

const Data = [
    require('@/assets/images/abstract1.jpg'),
    require('@/assets/images/nature.jpg'),
    require('@/assets/images/space1.jpg'),
    require('@/assets/images/alien.jpg'),
    require('@/assets/images/nature2.jpg'),
    require('@/assets/images/space2.jpg'),
    require('@/assets/images/jon.jpg'),
    require('@/assets/images/space6.jpg'),
]
const { width: WIDTH } = Dimensions.get('window')
const CARD_WIDTH = WIDTH * 0.78
const SPACING = 16
const ITEM_SIZE = CARD_WIDTH + SPACING
const SPACER = (WIDTH - ITEM_SIZE) / 2

const CarouselItem = ({ item, index, scrollX }: { item: any, index: number, scrollX: any }) => {

    const rStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * ITEM_SIZE - 28,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE - 28,
        ];

        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.6, 1, 0.6],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity
        }
    });

    return (
        <Animated.View style={{ width: ITEM_SIZE, alignItems: 'center', justifyContent: 'center' }}>
            <Animated.Image
                source={item}
                style={[{ width: CARD_WIDTH, height: 180, marginHorizontal: SPACING / 2, borderRadius: 20, resizeMode: 'cover' }, rStyle]}
            />
        </Animated.View>
    )
}

export const BannerCarousel = () => {
    const scrollRef = useRef<Animated.ScrollView>(null);

    const scrollX = useSharedValue(0);
    const progress = useDerivedValue(() => scrollX.value / ITEM_SIZE)

    const onScroll = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollRef.current) return;

            const currentIndex = Math.round(scrollX.value / ITEM_SIZE);

            const nextIndex = currentIndex + 1 >= Data.length ? 0 : currentIndex + 1;

            scrollRef.current.scrollTo({
                x: nextIndex * ITEM_SIZE,
                animated: true,
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (
        <View style={{ alignItems: 'center' }}>
            <Animated.ScrollView
                ref={scrollRef}
                horizontal
                onScroll={onScroll}

                pagingEnabled={false}
                snapToInterval={ITEM_SIZE}
                decelerationRate="fast"

                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                snapToAlignment="start"
                contentContainerStyle={{
                    paddingHorizontal: SPACER
                }}
                style={{
                    width: WIDTH,
                    alignSelf: 'center',
                    flexGrow: 0,
                }}
            >
                {
                    Data.map((item, index) => {

                        return (
                            <CarouselItem
                                key={index}
                                index={index}
                                item={item}
                                scrollX={scrollX}
                            />
                        )
                    })
                }
            </Animated.ScrollView>
            <Space height={8} />
            {/* Pagination */}
            <View style={styles.dots}>
                {Data.map((_, i) => {
                    return <Dots key={i} i={i} progress={progress} />
                })}
            </View>
        </View >
    )
}

const Dots = ({ i, progress }: { i: number, progress: any }) => {
    const gStyle = useAnimatedStyle(() => {
        const width = interpolate(
            progress.value,
            [i - 1, i, i + 1],
            [8, 28, 8],
            Extrapolation.CLAMP
        )
        const opacity = interpolate(
            progress.value,
            [i - 1, i, i + 1],
            [0.5, 1, 0.5],
            Extrapolation.CLAMP
        )
        return { width, opacity }
    })
    return <Animated.View style={[styles.dot, gStyle]} />
}

const styles = StyleSheet.create((theme, rt) => ({
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    dot: {
        height: 6,
        width: 8,
        borderRadius: 3,
        backgroundColor: theme.colors.typography,
    },
}))
