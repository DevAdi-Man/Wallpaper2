import { StyleProp, Text, TextStyle } from "react-native"
import { StyleSheet } from "react-native-unistyles"

interface ThemeTextProp {
    children: React.ReactNode
    variant: 'body' | 'caption' | 'title'
    style?: StyleProp<TextStyle>
    numberOfLines?: number
}

export const ThemeText: React.FC<ThemeTextProp> = ({ children, style, variant = 'body', numberOfLines = 1 }) => {
    styled.useVariants({ variant })
    return (
        <Text style={[styled.text, style]} numberOfLines={numberOfLines}>
            {children}
        </Text>
    )
}

const styled = StyleSheet.create((theme, rt) => ({
    text: {
        color: theme.colors.typography,
        variants: {
            variant: {
                body: {
                    fontSize: rt.fontScale * 16,
                    lineHeight: rt.fontScale * 24,
                    letterSpacing: 0.5,
                    fontWeight: '400'
                },
                caption: {
                    fontSize: rt.fontScale * 12,
                    lineHeight: rt.fontScale * 18,
                    fontWeight: '500',
                    letterSpacing: 0.2,
                    opacity: 0.7
                },
                title: {
                    fontSize: rt.fontScale * 34,
                    lineHeight: rt.fontScale * 40,
                    letterSpacing: -0.5,
                    fontWeight: '700'
                }
            }
        }
    },
}))
