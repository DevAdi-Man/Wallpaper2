import { ThemeText } from "@/src/components/themeText"
import { useAuth } from "@/src/context/AuthContext"
import { Pressable } from "react-native"
import { StyleSheet } from "react-native-unistyles"

export const LogOut = ()=>{
    const {logout} = useAuth()
    return (
        <Pressable onPress={logout} style={styles.container}>
            <ThemeText variant="body" style={styles.text}>
                Logout
            </ThemeText>
        </Pressable>
    )
}
const styles = StyleSheet.create((theme,rt)=>({
    container:{
        backgroundColor:theme.colors.surface,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    text:{
        textAlign:'center',
        color:theme.colors.tabBarActive,
        fontSize:rt.fontScale * 24,
        paddingVertical:2
    }
}))
