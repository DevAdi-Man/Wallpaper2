import { useLocalSearchParams, Stack  } from 'expo-router';
import { View, Alert, Pressable, Text, Image as RNImage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import React, { useState } from 'react';
import { ThemeIcons } from '@/src/components/themeIcons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { File, Paths, Directory } from 'expo-file-system'
import { setWallpaperAsync, WallpaperMode } from '@/modules/my-wallpaper';
import Animated, { AnimatedProps } from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image) as React.ComponentType<
    AnimatedProps<ImageProps>
>;

export default function WallpaperDetail() {
    const {id, imageSource } = useLocalSearchParams();
    const { theme } = useUnistyles()
    const uriString = Array.isArray(imageSource) ? imageSource[0] : imageSource;
    const source = uriString && !isNaN(Number(uriString)) ? Number(uriString) : uriString;

    const itemId = Array.isArray(id) ? id[0] : id;
    const [selectedLocation, setSelectedLocation] = useState<WallpaperMode>('home');
    const [isSetting, setIsSetting] = useState(false);

    const createDirectory = async (remoteUri: string) => {
        try {
            const folderName = 'wallpaper_cache';
            const dir = new Directory(Paths.cache, folderName);
            if (!dir.exists) {
                dir.create()
            }

            const fileName = remoteUri.split('/').pop() || `wallpaper-${Date.now()}.jpg`;
            const file = new File(dir, fileName);

            if (file.exists) {
                console.log("File already exists locally, using cache:", file.uri);
                return file.uri;
            }
            const output = await File.downloadFileAsync(remoteUri, file);
            return output.uri;
        } catch (error) {
            console.error("Download failed:", error);
            return remoteUri;
        }
    }
    const handleSetWallpaper = async () => {
        // Prevent function from running if source is missing
        if (!source) {
            Alert.alert("Error", "No image source found.");
            return;
        }

        try {
            setIsSetting(true);

            // 1. Resolve URI (Keep this logic, it is required for your specific app structure)
            let finalUri: string;
            if (typeof source === 'number') {
                const resolved = RNImage.resolveAssetSource(source);
                finalUri = resolved.uri;
            } else {
                finalUri = source.toString();
            }
            // 2. Call the Native Module (Cleaned up to match example structure)
            const lastUri = await createDirectory(finalUri)
            await setWallpaperAsync(lastUri, selectedLocation);
            // 3. Success Alert
            Alert.alert("Success", "Wallpaper updated successfully!", [
                { text: "OK", }
            ]);

        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Failed to set wallpaper.");
        } finally {
            setIsSetting(false);
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                headerShown: true,
                title: '',
                headerTransparent: true,
                headerTintColor: theme.colors.primary,
                headerRight: () => (
                    <TouchableOpacity style={styles.backButtonn} onPress={handleSetWallpaper} disabled={isSetting}>
                        {isSetting ? (
                            <ActivityIndicator color={theme.colors.elements.electro} />
                        ) : (
                            <ThemeIcons IconsName={Ionicons} name="checkmark" size={28} style={{ marginRight: 10 }} />
                        )}
                    </TouchableOpacity>
                )
            }} />

            {source && (
                <AnimatedImage
                    source={source}
                    style={styles.fullImage}
                    contentFit='cover'
                    // @ts-ignore
                    sharedTransitionTag={`wallpaper-${itemId}`}
                />
            )}
            <View style={styles.bottomBar}>
                <TabButton
                    IconsName={Ionicons}
                    icon="phone-portrait-outline"
                    label="Home screen"
                    isSelected={selectedLocation === 'home'}
                    onPress={() => setSelectedLocation('home')}
                    activeColor={theme.colors.tabBarActive}
                    inactiveColor={theme.colors.tabBarInactive}
                />

                <TabButton
                    IconsName={Ionicons}
                    icon="lock-closed-outline"
                    label="Lock screen"
                    isSelected={selectedLocation === 'lock'}
                    onPress={() => setSelectedLocation('lock')}
                    activeColor={theme.colors.tabBarActive}
                    inactiveColor={theme.colors.tabBarInactive}
                />

                <TabButton
                    IconsName={Ionicons}
                    icon="layers-outline"
                    label="Set as both"
                    isSelected={selectedLocation === 'both'}
                    onPress={() => setSelectedLocation('both')}
                    activeColor={theme.colors.tabBarActive}
                    inactiveColor={theme.colors.tabBarInactive}
                />
            </View>
        </View>
    );
}
function TabButton({ IconsName, icon, label, isSelected, onPress, activeColor,
    inactiveColor }: {
        IconsName: any, icon: any, label: string, isSelected: boolean, onPress: () => void, activeColor: string,
        inactiveColor: string
    }) {
    const color = isSelected ? activeColor : inactiveColor;
    return (
        <Pressable onPress={onPress} style={styles.tabButton}>
            <ThemeIcons
                IconsName={IconsName}
                name={icon}
                size={24}
                color={color}
            />
            <Text style={[styles.tabLabel, { color }]}>
                {label}
            </Text>
        </Pressable>
    );
}
const styles = StyleSheet.create((theme) => ({
    container: { flex: 1, backgroundColor: theme.colors.background },
    fullImage: { width: '100%', height: '100%' },
    overlay: { position: 'absolute', bottom: 40, left: 20 },
    backButtonn: {
        borderRadius: 50,
        backgroundColor: theme.colors.card,
        paddingVertical: 4,
        alignContent: 'center',
        borderWidth: 2
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    tabLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: theme.colors.tabBarBackground,
        paddingVertical: 10,
        // paddingTop: 20,
        // height: 100,
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
}));
