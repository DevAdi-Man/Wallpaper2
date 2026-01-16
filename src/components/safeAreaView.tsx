import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from 'react-native-unistyles';

interface SafeAreaViewProp extends ViewProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>
}

export default function SafeAreaView({ children, style, ...props }: SafeAreaViewProp) {
    const inset = useSafeAreaInsets();

    return (
        <View
            {...props}
            style={[
                styles.container,
                style,
                {
                    paddingTop: inset.top,
                    paddingHorizontal: 8
                }
            ]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    }
}))
