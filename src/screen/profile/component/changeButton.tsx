import { ThemeIcons } from "@/src/components/themeIcons";
import { ThemeText } from "@/src/components/themeText";
import { AntDesign } from "@expo/vector-icons";
import { ButtonProps, Pressable } from "react-native";
import { StyleSheet } from "react-native-unistyles";

interface Button extends ButtonProps {
    onPress: () => void;
}

export const ChangeButton: React.FC<Button> = ({onPress,title}) => {

    return (
        <Pressable style={styles.passButton} onPress={onPress}>
            <ThemeText style={styles.passText} variant="body">
                {title}
            </ThemeText>
            <ThemeIcons IconsName={AntDesign} name={"right"} size={20} />
        </Pressable>
    )
}
const styles = StyleSheet.create((theme, rt) => ({
    passButton: {
        backgroundColor: theme.colors.card,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    passText: {
        fontSize: rt.fontScale * 20
    }
}))
