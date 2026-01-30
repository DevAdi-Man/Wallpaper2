import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Image } from 'expo-image';
import { WallpaperProps } from "@/src/services/wallpaperService";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFavourites } from "../screen/favorites/store/favourites";

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface WallpaperItemProps {
    item: WallpaperProps;
    openWallpaperRoute: (item: WallpaperProps) => void;
}

export const FavoriteItem = React.memo(({ item, openWallpaperRoute }: WallpaperItemProps) => {
    // Define value for animation
    const scale = useSharedValue(0);
    const [heartColor, setHeartColor] = useState<string>('white')
    const toggleFav = useFavourites(state => state.toggleFav)
    const isFavorite = useFavourites(state =>
        state.favorites.some(f => f.id === item.id)
    );

    const likeHeart = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: scale.value
    }));

    const gesture = useMemo(() => {
        const onLike = () => {
            'worklet'
            scale.value = withSpring(1, {
                dampingRatio: 1,
                mass: 4,
                energyThreshold: 6e-9,
                velocity: 0,
            }, () => {
                scale.value = withSpring(0);
            })
        }
        const doubleTab = Gesture.Tap()
            .numberOfTaps(2)
            .runOnJS(true)
            .maxDelay(200)
            .onEnd(() => {
                const color = isFavorite ? 'white' : 'red';
                setHeartColor(color);
                onLike()
                setTimeout(() => {
                    toggleFav({
                        id: item.id,
                        imageSource: item.imageSource,
                        height: item.height
                    })
                },700)
            })

        const singleTap = Gesture.Tap()
            .numberOfTaps(1)
            .runOnJS(true)
            .maxDeltaX(10)
            .maxDeltaY(10)
            .onEnd(() => {
                openWallpaperRoute(item)
            })
        return Gesture.Exclusive(doubleTab, singleTap);
    }, [item, openWallpaperRoute, scale, isFavorite, toggleFav])
    return (
        <GestureDetector gesture={gesture}>
            <View style={styles.card}>
                <AnimatedImage
                    source={item.imageSource}
                    style={[styles.image, { height: item.height }]}
                    // @ts-ignore
                    sharedTransitionTag={`wallpaper-${item.id}`}
                />
                <Animated.View style={[styles.heart, likeHeart]}>
                    <Ionicons name="heart" size={50} color={heartColor} />
                </Animated.View>
                {isFavorite && (
                    <View style={styles.iconContainer}>
                        <Ionicons name="heart" size={24} color="red" />
                    </View>
                )}
            </View>
        </GestureDetector>
    )
})

FavoriteItem.displayName = 'FavoriteItem';
const styles = StyleSheet.create((theme) => ({
    card: {
        margin: 8,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: theme.colors.card,
        position: 'relative'
    },
    image: {
        width: '100%',
    },
    heart: {
        position: 'absolute',
        alignSelf: 'center',
        top: '40%',
        width: 80,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 40,
        pointerEvents: 'none',
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
        padding: 6,
        zIndex: 5
    }
}))
