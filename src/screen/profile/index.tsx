import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeText } from "@/src/components/themeText"
import { useAuth } from "@/src/context/AuthContext"
import { Button } from "react-native"

export const Profile = () => {
    const { logout } = useAuth()
    const handleLogout = async () => {
        await logout()
    }
    return (
        <SafeAreaView>
            <ThemeText variant="body">Profile</ThemeText>
            <Button title="logout" onPress={handleLogout} />
        </SafeAreaView>
    )
}
