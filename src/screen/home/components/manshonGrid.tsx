import { DATA } from "@/src/utils/data";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Image } from 'expo-image';
import { FavoriteButton } from "./favoriteButton";

export const ManshonGrid = () => {
    const route = useRouter()
    const extendedData = useMemo(() => {
        return DATA.map((img, index) => ({
            id: index.toString(),
            imgSource: img,
            height: Math.floor(Math.random() * 100) + 200
        }))
    }, [])
    return (
        <FlashList
            data={extendedData}
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
                                imgUri: item.imgSource,
                            }
                        })
                    }}
                    style={styles.card}>
                    <Image source={item.imgSource} style={[styles.image, { height: item.height }]} />
                    <FavoriteButton wallpaper={{id:item.id,url:item.imgSource}}/>
                </Pressable>
            )}
        />
    )
}

const styles = StyleSheet.create((theme) => ({
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
    heart: {
        position: 'absolute',
        top: 8,
        right: 6
    }
}))
