import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeText } from "@/src/components/themeText"
import { Space } from "@/src/components/space"
import { ManshonGrid } from "./components/manshonGrid"

export const Home = () => {
    return (
        <SafeAreaView>
            <ThemeText variant="title" style={{ paddingHorizontal: 8 }}>Pixory</ThemeText>
            <Space height={16} />
            <ManshonGrid />
        </SafeAreaView>
    )
}
