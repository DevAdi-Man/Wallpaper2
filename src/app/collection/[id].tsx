import SafeAreaView from "@/src/components/safeAreaView";
import { Space } from "@/src/components/space";
import { ThemeText } from "@/src/components/themeText";
import { ManshonGrid } from "@/src/screen/home/components/manshonGrid";
import {  useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

export default function CollectionDetails(){
   const {id,name} = useLocalSearchParams()
    return (
        <SafeAreaView>
            <ThemeText variant="title" style={styles.title}>{name}</ThemeText>
            <Space height={16}/>
            <ManshonGrid />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create((theme)=>({
    title:{
        paddingHorizontal:16
    }
}))
