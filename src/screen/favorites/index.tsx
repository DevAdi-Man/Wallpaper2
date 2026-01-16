import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeText } from "@/src/components/themeText"
import { StyleSheet } from "react-native-unistyles"
import { useFavourites } from "./store/favourites"
import { Space } from "@/src/components/space"
import { FlashList } from "@shopify/flash-list"
import { Pressable } from "react-native"
import { useRouter } from "expo-router"
import { Image } from "expo-image"
import { FavoriteButton } from "../home/components/favoriteButton"

export const Favorites = () => {
    const route = useRouter()
    const Favorites = useFavourites((state) => state.favorites)
    console.log("--->",Favorites)
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
                    <Pressable
                        onPress={() => {
                            route.push({
                                pathname: '/wallpaper/[id]',
                                params: {
                                    id: item.id,
                                    imgUri: item.url,
                                }
                            })
                        }}
                        style={styles.card}>
                        <Image source={item.url} style={[styles.image, { height: 300}]} />
                        <FavoriteButton wallpaper={{ id: item.id, url: item.url }} />
                    </Pressable>
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
