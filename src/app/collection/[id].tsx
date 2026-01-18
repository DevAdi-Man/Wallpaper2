import SafeAreaView from "@/src/components/safeAreaView";
import { Space } from "@/src/components/space";
import { ThemeIcons } from "@/src/components/themeIcons";
import { ThemeText } from "@/src/components/themeText";
import { ManshonGrid } from "@/src/screen/home/components/manshonGrid";
import { AntDesign } from "@expo/vector-icons";
import {  useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function CollectionDetails(){
   const {id,name} = useLocalSearchParams()
    const router = useRouter()
    const collectionId = Array.isArray(id) ? id[0] : id;
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ThemeIcons IconsName={AntDesign} name="arrow-left" size={24} />
                </Pressable>
                <ThemeText variant="title" style={styles.title}>{name}</ThemeText>
            </View>
            <Space height={8}/>
            <ManshonGrid collectionId={collectionId} type="item" />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create((theme)=>({
    headerContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap:24
    },
    backButton: {
        padding: 4,
    },
    title: {
        flex: 1,
    },
}))
