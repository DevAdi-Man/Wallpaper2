import { View } from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import SafeAreaView from "../components/safeAreaView";
import { ThemeText } from "../components/themeText";
import { Space } from "../components/space";
import { ThemeButton } from "../components/themeButton";
import { Feather } from "@expo/vector-icons";
import { Image } from 'expo-image';

export default function WelcomeScreen() {
    const { theme } = useUnistyles();

    const handleGetStarted = () => {
        router.replace('/(auth)');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.firstImage}
                        source={require("../../assets/images/welcome1.jpg")}
                    />
                </View>

                <Space height={4} />

                <View style={[styles.imageContainer, styles.row]}>
                    <Image
                        style={[styles.gridImage, styles.grid40]}
                        source={require("../../assets/images/welcome3.jpg")}
                    />
                    <Space width={16} />
                    <Image
                        style={[styles.gridImage, styles.grid55]}
                        source={require("../../assets/images/welcome4.jpg")}
                    />
                </View>

                <Space height={4} />

                <View style={[styles.imageContainer, styles.row]}>
                    <Image
                        style={[styles.gridImage, styles.grid55]}
                        source={require("../../assets/images/welcome2.jpg")}
                    />
                    <Space width={16} />
                    <Image
                        style={[styles.gridImage, styles.grid40]}
                        source={require("../../assets/images/welcome3.jpg")}
                    />
                </View>
                <LinearGradient
                    colors={[theme.gradient.welcomeFade[0], theme.gradient.welcomeFade[1], theme.gradient.welcomeFade[2]]}
                    locations={[0.3, 0.7, 1]}
                    style={styles.gradient}
                    pointerEvents="none"
                />
            </View>
            <View style={styles.content}>
                <ThemeText variant="title">Change your mind</ThemeText>
                <Space height={4} />
                <ThemeText variant="body">with new wallpaper</ThemeText>
                <Space height={16} />
                <ThemeButton onPress={handleGetStarted} content="Get stared" isIcon={true} IconsName={Feather} name={'chevrons-right'} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    row: {
        flexDirection: "row",
    },
    imageContainer: {
        marginTop: 16,
        paddingHorizontal: 8,
    },
    firstImage: {
        height: 220,
        width: "100%",
        borderRadius: 32,
    },
    gridImage: {
        height: 200,
        borderRadius: 32,
    },
    grid40: {
        width: "40%",
    },
    grid55: {
        width: "55%",
    },
    gradient: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 280,
    },
    content: {
        paddingBottom: 32,
        alignItems: "center",
    },
}));

