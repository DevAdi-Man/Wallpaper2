import { TextInput, TextInputProps } from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"

interface ThemeTextInputProp extends TextInputProps {
    varient?: 'default' | 'search' | 'area'
}

export const ThemeTextInput: React.FC<ThemeTextInputProp> = (
    {
        style,
        varient = 'default',
        ...props
    }
) => {
    const { theme } = useUnistyles();
    return <TextInput {...props} placeholderTextColor={theme.colors.tabBarInactive} style={[styles.input, style]} />
}
const styles = StyleSheet.create((theme, rt) => ({
    input: {
        width: '100%',
        fontSize: rt.fontScale * 18,
        color: theme.colors.typography,
        borderRadius: 12,
        borderColor: 'transparent',
        paddingLeft:8,
        variants: {
            variant: {
                default: {
                    height: 50,
                    paddingHorizontal: 16,
                },
                search: {
                    height: 45,
                    borderRadius: 50,
                    paddingHorizontal: 20,
                },
                area: {
                    height: 120,
                    padding: 16,
                    textAlignVertical: 'top',
                }
            },
        }
    }
}))
