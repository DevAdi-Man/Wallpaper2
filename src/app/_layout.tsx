import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useAuthStore } from "../store/auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { user, isLoading, hasHydrated } = useAuthStore();

    useEffect(() => {
        const prepareApp = async () => {
            if (!hasHydrated) return;
            try {
                await ScreenOrientation.unlockAsync();
            } finally {
                await SplashScreen.hideAsync();
            }
        };

        prepareApp();
    }, [hasHydrated])

    if (!hasHydrated || isLoading) return null;

    return (
        <KeyboardProvider>
            <StatusBar />
            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Protected guard={!user}>
                    <Stack.Screen name="index" options={{ animation: 'fade' }} />
                    <Stack.Screen name="(auth)" />
                </Stack.Protected>
                <Stack.Protected guard={!!user}>
                    <Stack.Screen name="(tabs)" />
                </Stack.Protected>
            </Stack>
        </KeyboardProvider>
    );
}


