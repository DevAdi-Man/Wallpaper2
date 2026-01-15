import { Pressable, StyleProp, ViewStyle } from "react-native"
import { ThemeText } from "./themeText"
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { ThemeIcons, ThemeIconsProp } from "./themeIcons";
type ButtonProp = {
    content: string,
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    isIcon?: boolean
} & ThemeIconsProp

export const ThemeButton: React.FC<ButtonProp> = ({ IconsName, name, content, onPress, style, isIcon = false }) => {
    const {theme} = useUnistyles()
    return (
        <Pressable style={[style, styles.container]} onPress={onPress}>
            <ThemeText style={styles.text} variant="body">{content}</ThemeText>
            {
                isIcon && (<ThemeIcons name={name} IconsName={IconsName} style={styles.icon} size={24} color={theme.colors.secondary} />)
            }
        </Pressable>
    )
}

const styles = StyleSheet.create((theme) => ({
    container: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    text: {
        color: theme.colors.background,
        fontWeight: '600',
        fontSize: 16
    },
    icon:{
        paddingLeft:16
    }
}))
