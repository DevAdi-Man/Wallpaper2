import { Pressable } from "react-native";
import { useFavourites } from "../../favorites/store/favourites";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Wallpaper } from '../../favorites/store/favourites'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from "react-native-reanimated";

type FavoriteButtonProps = {
    wallpaper: Wallpaper;
};
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ wallpaper }) => {
    const favorites = useFavourites((state) => state.favorites);
    const toggleFavorite = useFavourites((state) => state.toggleFav);
    const isFavorite = favorites.some((fav) => fav.id === wallpaper.id);

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    })

    const handlePress = () => {
        scale.value = withSequence(
            withSpring(1.2),
            withSpring(1)
        )
        toggleFavorite(wallpaper)
    }
    return <Pressable
        onPress={handlePress}
        style={{ position: 'absolute', top: 8, right: 6, zIndex: 10 }}
    >
        <Animated.View style={animatedStyle}>
            {isFavorite ? (
                <AntDesign name="heart" size={24} color="red" />
            ) : (
                <FontAwesome name="heart-o" size={24} color="white" />
            )}
        </Animated.View>
    </Pressable>
}
