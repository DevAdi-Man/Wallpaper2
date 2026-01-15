import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    useEffect(() => {
        const unlockScreenOerientation = async () => {
            await ScreenOrientation.unlockAsync()
        }
        unlockScreenOerientation()
    }, [])
    return (
        <>
            <StatusBar />
            <Stack screenOptions={{ headerShown: false }} />
        </>
    );
}


