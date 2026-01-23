import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Alert, Pressable, Text, Image as RNImage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image, ImageProps } from 'expo-image';
import React, { useState } from 'react';
import { ThemeIcons } from '@/src/components/themeIcons';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { File, Paths, Directory } from 'expo-file-system'
import { setWallpaperAsync, WallpaperMode } from '@/modules/my-wallpaper';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import SafeAreaView from '@/src/components/safeAreaView';

const AnimatedImage = Animated.createAnimatedComponent(Image) as React.ComponentType<
    AnimatedProps<ImageProps>
>;

export default function WallpaperDetail() {
    const { id, imageSource } = useLocalSearchParams();
    const { theme } = useUnistyles()
    const uriString = Array.isArray(imageSource) ? imageSource[0] : imageSource;
    const source = uriString && !isNaN(Number(uriString)) ? Number(uriString) : uriString;
    const router = useRouter()
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
            // 3. Success Toast
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity("Wallpaper updated successfully!", ToastAndroid.LONG, ToastAndroid.CENTER);
            }

        } catch (error: any) {
            console.error(error);
            Alert.alert("Error", error.message || "Failed to set wallpaper.");
        } finally {
            setIsSetting(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <ThemeIcons IconsName={Ionicons} name={"arrow-back"} size={28} />
                </Pressable>
                <TouchableOpacity style={styles.backButton} onPress={handleSetWallpaper} disabled={isSetting}>
                    {isSetting ? (
                        <ActivityIndicator color={theme.colors.elements.electro} />
                    ) : (
                        <ThemeIcons IconsName={Ionicons} name="checkmark" size={28}  />
                    )}
                </TouchableOpacity>
            </View>

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
    backButton: {
        borderRadius: 50,
        backgroundColor: theme.colors.card,
        paddingVertical: 4,
        paddingHorizontal:4,
        alignContent: 'center',
    },
    headerContainer: {
        paddingHorizontal:16,
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        position: 'absolute',
        top: 40,
        zIndex: 20
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
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
}));
/*
 *<svg width="593" height="547" viewBox="0 0 593 547" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M471.292 543.02C438.292 553.02 436.791 542.022 415.292 527.521C393.792 513.02 346.292 353.02 296.792 353.02C247.292 353.02 203.291 506.02 184.791 524.02C166.291 542.019 168.791 542.521 127.791 543.02C86.7915 543.52 15.7916 448.02 4.29158 433.02C-7.20842 418.019 6.79078 397.52 18.2915 381.52C29.7922 365.521 183.291 174.019 204.791 149.52C226.291 125.02 240.791 153.519 240.791 160.52C240.791 167.52 214.079 223.122 237.292 228.02C260.504 232.917 264.292 204.023 268.292 178.023C272.292 152.023 306.292 153.025 318.292 168.523C330.292 184.021 332.292 234.019 353.792 231.023C375.292 228.027 346.292 172.52 353.792 158.022L354.098 157.43C361.429 143.255 366.415 133.615 375.292 140.022C408.712 164.144 431.245 197.573 453.066 229.946L453.792 231.023C496.792 281.023 534.58 339.305 582.292 387.021C591.792 396.522 595.292 422.022 590.792 426.021C588.797 427.794 575.264 453.04 551.292 478.521C529.183 502.021 504.292 533.021 471.292 543.02Z" fill="white"/>
<path d="M311.731 111.539C290.62 116.276 283.49 108.264 280.168 104.935C276.846 101.607 272.695 86.6304 281.831 88.2945C290.968 89.9586 278.799 75.8966 276.016 64.1069C268.541 32.436 305.184 48.3509 292.629 30.8249C284.323 19.2291 295.566 3.08687 305.917 1.70596C343.293 -3.28067 347.446 3.372 355.752 12.5185C371.018 29.3292 368.434 54.1575 353.261 62.4483C334.987 72.4329 331.665 69.1047 324.19 77.4252C316.714 85.7457 325.02 81.6381 328.343 88.2945C330.237 92.0892 341.633 104.83 311.731 111.539Z" fill="white"/>
</svg>
 * */
