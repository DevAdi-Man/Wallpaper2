import SafeAreaView from "@/src/components/safeAreaView"
import { SearchBar } from "./components/searchBar"
import { BannerCarousel } from "../home/components/bannerCarousel"
import { Space } from "@/src/components/space"
import { CategorySection } from "./components/categorySection"
import { FlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { CategoryGroup, getCategories } from "@/src/services/categoryServices"
import { ActivityIndicator, View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

export const Categories = () => {
    const router = useRouter()
    const [data, setData] = useState<CategoryGroup[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        loadLoad()
    }, [])
    const loadLoad = async () => {
        try {
            const categories = await getCategories()
            setData(categories)
        } catch (error) {
            console.error("Error on Categories Screen", error)
            throw Error
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            </View>
        )
    }
    return (
        <SafeAreaView>
            <Space height={16} />
            <SearchBar />
            <Space height={24} />
            <BannerCarousel />
            <Space height={24} />
            <FlashList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <CategorySection
                            onPress={() => {
                                router.push({
                                    pathname: '/(tabs)/category/[id]',
                                    params: {
                                        id: item.id,
                                        name: item.groupName
                                    }
                                })
                            }}
                            id={item.id}
                            items={item.items}
                            groupName={item.groupName}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create((theme) => ({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
}))
