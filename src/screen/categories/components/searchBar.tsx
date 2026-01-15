import { ThemeIcons } from "@/src/components/themeIcons"
import { ThemeTextInput } from "@/src/components/themeTextInput"
import { Feather } from "@expo/vector-icons"
import { View } from "react-native"
import { StyleSheet } from "react-native-unistyles"

export const SearchBar = () => {
    return (
        <View style={styles.container}>
            <ThemeIcons IconsName={Feather} name={"search"} size={28} />
            <ThemeTextInput style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create((theme,rt) => ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:theme.colors.card,
        paddingHorizontal:8,
        marginHorizontal:8,
        borderRadius:8
    },
    input: {
        width:rt.screen.width * .86,
        paddingVertical:8
    },
}))
