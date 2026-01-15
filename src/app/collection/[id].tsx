import SafeAreaView from "@/src/components/safeAreaView";
import { ThemeText } from "@/src/components/themeText";
import {  useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native-unistyles";

export default function CollectionDetails(){
   const {id,name} = useLocalSearchParams()
    return (
        <SafeAreaView>
            <ThemeText variant="caption">{name}</ThemeText>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create((theme)=>({
    conatiner:{
        flex:1,
        backgroundColor:theme.colors.background
    }
}))
