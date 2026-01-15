import { StyleSheet } from 'react-native-unistyles'
// 1. Shared Colors (Elements & Rarity don't change between modes)
const sharedColors = {
    elements: {
        pyro: '#FF7755',
        hydro: '#4CC2F1',
        anemo: '#55E4B0',
        electro: '#CA82FF',
        geo: '#FFC155',
        cryo: '#9FD6E3',
        dendro: '#A5C83B',
    },
    rarity: {
        fiveStar: '#FFD700', // Gold
        fourStar: '#A020F0', // Purple
        threeStar: '#3E9BF0' // Blue
    }
}

// 2. The "Genshin" Dark Theme (Authentic Game UI)
const darkTheme = {
    mode: 'dark',
    colors: {
        // Main Background: Deep Navy Blue
        background: '#181b2c',
        statusBar: '#181b2c',
        // Cards: Glassmorphism base (slightly lighter blue-grey)
        card: '#252a41',
        cardBorder: 'rgba(255, 255, 255, 0.1)',

        // Text
        typography: '#ECE5D8', // Warm off-white (Standard Genshin text)
        typographySecondary: '#A3A6C2', // Muted blue-grey

        // Accents
        primary: '#D3BC8E', // The "Genshin Beige/Gold" used in buttons
        secondary: '#495366', // Inactive button/tab background

        // Tab Bar specific
        tabBarBackground: '#131624',
        tabBarActive: '#D3BC8E',
        tabBarInactive: '#585D75',

        surface: '#121421',
        ...sharedColors
    },
    gradient: {
        welcomeFade: [
            'rgba(31, 36, 64, 0)',
            'rgba(31, 36, 64, 0.6)',
            '#181b2c'
        ]
    },
    gap: (v: number) => v * 8
}

// 3. The "Wiki" Light Theme (Clean/Readable)
const lightTheme = {
    mode: 'light',
    colors: {
        // Main Background: Soft Gray
        background: '#F0F2F5',
        // Cards: Pure Whit
        statusBar: '#F0F2F5',
        card: '#FFFFFF',
        cardBorder: '#E5E7EB',

        // Text
        typography: '#1F2937', // Dark Grey/Black
        typographySecondary: '#6B7280', // Medium Grey

        // Accents
        primary: '#3B82F6', // Standard modern blue accent
        secondary: '#E5E7EB', // Light grey for inactive states

        // Tab Bar specific
        tabBarBackground: '#FFFFFF',
        tabBarActive: '#3B82F6',
        tabBarInactive: '#9CA3AF',

        surface: '#FFFFFF',

        ...sharedColors
    },
    gradient: {
        welcomeFade: [
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.7)',
            '#F0F2F5'
        ]
    },
    gap: (v: number) => v * 8
}

const appThemes = {
    light: lightTheme,
    dark: darkTheme
}

const breakpoints = {
    xs: 0,
    sm: 300,
    md: 500,
    lg: 800,
    xl: 1200
}

type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appThemes

declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppThemes { }
    export interface UnistylesBreakpoints extends AppBreakpoints { }
}

StyleSheet.configure({
    settings: {
        adaptiveThemes: true,
    },
    breakpoints,
    themes: appThemes
})
