import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AuthProvider, useAuth } from "../context/AuthContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
    duration: 1000,
    fade: true
})
function RootLayoutNav() {
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync()
        }
    }, [isLoading]);

    useEffect(() => {
        const prepareApp = async () => {
            await ScreenOrientation.unlockAsync();
        };
        prepareApp();
    }, []);
    if (isLoading) {
        return null;
    }

    return (
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Protected guard={!user}>
                <Stack.Screen name="index" options={{ animation: 'fade' }} />
                <Stack.Screen name="(auth)" />
            </Stack.Protected>
            <Stack.Protected guard={!!user}>
                <Stack.Screen name="(tabs)" />
            </Stack.Protected>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <AuthProvider>
                <KeyboardProvider>
                    <StatusBar />
                    <RootLayoutNav />
                </KeyboardProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
