import SafeAreaView from "@/src/components/safeAreaView"
import { SearchBar } from "./components/searchBar"
import { BannerCarousel } from "../home/components/bannerCarousel"
import { Space } from "@/src/components/space"
import { CategorySection } from "./components/categorySection"
import { FlashList } from "@shopify/flash-list"
import { categorieslist } from "@/src/utils/categoriesList"
import { useRouter } from "expo-router"

export const Categories = () => {
    const router = useRouter()
    return (
        <SafeAreaView>
            <Space height={16} />
            <SearchBar />
            <Space height={24} />
            <BannerCarousel />
            <Space height={24} />
            <FlashList
                data={categorieslist}
                renderItem={({ item }) => (
                    <CategorySection onPress={() => {
                        router.push({
                            pathname: '/collection/[id]',
                            params: {
                                id: item.id,
                                name: item.groupName
                            }
                        })
                    }} id={item.id} items={item.items} groupName={item.groupName} />
                )}
            />
        </SafeAreaView>
    )
}
