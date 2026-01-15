import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import { Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { ThemeIcons } from "./themeIcons";
import { useRouter, usePathname } from "expo-router";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const TabBarConfig = [
    {
        name: 'index',
        iconsFamilyName: Octicons,
        iconName: 'home-fill'
    },
    {
        name: 'categories',
        iconsFamilyName: MaterialIcons,
        iconName: 'category'
    },
    {
        name: 'favorites',
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
    const pathname = usePathname();
    
    return (
        <SafeAreaView edges={['bottom']} style={[styles.safe, { backgroundColor: theme.colors.tabBarBackground }]}>
            {
                TabBarConfig.map((tab) => {
                    const isFocused = pathname === `/${tab.name}` || (pathname === '/' && tab.name === 'index');
                    const activeIconColor = isFocused ? theme.colors.tabBarActive : theme.colors.tabBarInactive;
                    
                    return (
                        <Pressable 
                            style={[styles.container]} 
                            key={tab.name} 
                            onPress={() => router.push(tab.name === 'index' ? '/' : `/${tab.name}` as any)}
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
        height: 80,
        alignItems: 'center'
    },
    container: {
        padding: 8,
        paddingHorizontal: 16,
    },
    text: {
        color: theme.colors.typography
    },
}))
