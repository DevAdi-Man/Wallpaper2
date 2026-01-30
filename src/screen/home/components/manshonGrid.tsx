import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { getWallpaper, WallpaperProps } from "@/src/services/wallpaperService";
import { FavoriteItem } from "@/src/components/favoriteItem";

export const ManshonGrid = ({ collectionId, type }: { collectionId?: string, type?: 'group' | 'item' }) => {
    const [wallpaper, setWallpaper] = useState<WallpaperProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true);
    const route = useRouter()

    useEffect(() => {
        setWallpaper([])
        setHasMore(true)
        loadWallpaperData(true)
    }, [collectionId, type])

    const loadWallpaperData = useCallback(async (isInitialLoad = false) => {
        if (!hasMore || (isFetchingMore && !isInitialLoad)) return;
        if (isInitialLoad) {
            setIsLoading(true)
        } else {
            setIsFetchingMore(true)
        }
        try {
            const lastId = !isInitialLoad && wallpaper.length > 0
                ? wallpaper[wallpaper.length - 1].id
                : undefined;
            const newBatch = await getWallpaper(collectionId, type, lastId);
            if (newBatch.length === 0) {
                setHasMore(false);
            } else {
                setWallpaper(prev => isInitialLoad ? newBatch : [...prev, ...newBatch])
            }
        } catch (error) {
            console.error("fail to fetch wallpaper:", error)
        } finally {
            setIsLoading(false)
            setIsFetchingMore(false)
        }
    }, [hasMore, isFetchingMore, wallpaper, collectionId, type])
    const renderFooter = () => {
        if (!isFetchingMore) return null;
        return <ActivityIndicator size="small" style={{ marginTop: 20 }} />;
    }


    const openWallpaperRoute = useCallback((item: WallpaperProps) => {
        route.push({
            pathname: '/wallpaper/[id]',
            params: {
                id: item.id,
                imageSource: item.imageSource,
            }
        })
    }, [route])

    if (isLoading && wallpaper.length === 0) {
        return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
    }

    return (
        <FlashList
            data={wallpaper}
            masonry
            numColumns={2}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
            onEndReached={() => loadWallpaperData(false)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            renderItem={({ item }) => (
                <FavoriteItem item={item} openWallpaperRoute={openWallpaperRoute} />
            )}
        />
    )
}
const styles = StyleSheet.create((theme) => ({
    container: {
        paddingHorizontal: 8,
    },
}))
