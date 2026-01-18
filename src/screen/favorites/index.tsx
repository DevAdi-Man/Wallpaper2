import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeText } from "@/src/components/themeText"
import { StyleSheet } from "react-native-unistyles"
import { useFavourites } from "./store/favourites"
import { Space } from "@/src/components/space"
import { FlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { useCallback } from "react"
import {  FavoriteItem } from "@/src/components/favoriteItem"
import { WallpaperProps } from "@/src/services/wallpaperService"

export const Favorites = () => {
    const route = useRouter()
    const Favorites = useFavourites((state) => state.favorites)
    const openWallpaperRoute = useCallback((item: WallpaperProps) => {
        route.push({
            pathname: '/wallpaper/[id]',
            params: {
                id: item.id,
                imageSource: item.imageSource,
            }
        })
    }, [route])
    return (
        <SafeAreaView>
            <ThemeText variant="title" style={styles.title}>Favorites</ThemeText>
            <Space height={16} />
            <FlashList
                data={Favorites}
                masonry
                numColumns={2}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FavoriteItem item={item} openWallpaperRoute={openWallpaperRoute} />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme) => ({
    title: {
        paddingHorizontal: 16
    },
    container: {
        paddingHorizontal: 8,
    },
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
}))
