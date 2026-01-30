import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { ThemeIcons } from "./themeIcons";
import { useRouter } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const TabBarConfig = [
    {
        name: 'home',
        iconsFamilyName: Octicons,
        iconName: 'home-fill'
    },
    {
        name: 'category',
        iconsFamilyName: MaterialIcons,
        iconName: 'category'
    },
    {
        name: 'favorite',
        iconsFamilyName: MaterialIcons,
        iconName: 'favorite'
    },
    {
        name: 'profile',
        iconsFamilyName: AntDesign,
        iconName: 'user'
    }
];

export const CustomeTabBar: React.FC<BottomTabBarProps> = ({state,navigation}) => {
    const { theme } = useUnistyles();
    const router = useRouter();
    return (
        <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: theme.colors.tabBarBackground }]}>
            {
                TabBarConfig.map((tab, index) => {
                    const isFocused = state.index === index;
                    const activeIconColor = isFocused ? theme.colors.tabBarActive : theme.colors.tabBarInactive;

                    return (
                        <Pressable
                            style={[styles.container]}
                            key={tab.name}
                            onPress={() => router.push(`/(tabs)/${tab.name}` as any)}
                        >
                            <ThemeIcons IconsName={tab.iconsFamilyName} name={tab.iconName} size={24} color={activeIconColor} />
                        </Pressable>
                    )
                })
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme) => ({
    safe: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
    },
    container: {
        padding: 8,
        paddingHorizontal: 16,
    },
    text: {
        color: theme.colors.typography
    },
}))
