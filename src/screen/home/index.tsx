import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeText } from "@/src/components/themeText"
import { StyleSheet } from "react-native-unistyles"
import { Button } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Space } from "@/src/components/space"
import { ManshonGrid } from "./components/manshonGrid"

export const Home = () => {
    const remove = async () => {
        console.log("removed")
        await AsyncStorage.removeItem('hasLaunched')
    }
    return (
        <SafeAreaView>
            <ThemeText variant="title" style={{paddingHorizontal:8}}>Pixory</ThemeText>
            {/* <Space height={16}/> */}
            {/* <BannerCarousel /> */}
            {/* <Space height={16}/> */}
            {/* <Button title="press" onPress={remove} /> */}
            <Space height={16}/>
            <ManshonGrid />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme, rt) => ({
}))
