import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeIcons } from "@/src/components/themeIcons"
import { ThemeText } from "@/src/components/themeText"
import { useAuth } from "@/src/context/AuthContext"
import { Entypo, Feather } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useState } from "react"
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native"
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { StyleSheet, useUnistyles } from "react-native-unistyles"
import * as ImagePicker from 'expo-image-picker';
import { userServices } from "@/src/services/userServices"

const EXPANDED_HEIGHT = 350;
const COLLAPSED_HEIGHT = 100;
const PROFILE_IMAGE_SIZE = 100;
const SCROLLABLE_RANGE = EXPANDED_HEIGHT - COLLAPSED_HEIGHT

export const Profile = () => {
    const [isUploading, setIsUploading] = useState<'avatar' | 'cover' | null>(null)
    const { user, userProfile, refreshProfile } = useAuth()
    const {theme}= useUnistyles()
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y
        }
    })
    const headerStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [-100, 0, SCROLLABLE_RANGE],
            [EXPANDED_HEIGHT + 100, EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
            Extrapolation.CLAMP
        )
        return {
            height
        }
    });

    const profileStyle = useAnimatedStyle(() => {
        const startTop = EXPANDED_HEIGHT - (PROFILE_IMAGE_SIZE / 2);
        const endTop = (COLLAPSED_HEIGHT / 2) - (PROFILE_IMAGE_SIZE / 2) + 40;

        const top = interpolate(
            scrollY.value,
            [0, SCROLLABLE_RANGE],
            [startTop, endTop],
            Extrapolation.CLAMP
        )
        const scale = interpolate(
            scrollY.value,
            [0, SCROLLABLE_RANGE],
            [1, 0.6],
            Extrapolation.CLAMP
        )
        return {
            top,
            transform: [{ scale }]
        }
    })

    // pick an image function for cover and avatar upload and update
    const handleImageUpdate = async (type: 'avatar' | 'cover') => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: type === 'avatar' ? [1, 1] : [16, 9],
            quality: 1
        });
        if (!result.canceled) {
            setIsUploading(type)
            try {
                const localUri = result.assets[0].uri;
                if (type === 'avatar') {
                    await userServices.updateAvatar(user!.$id, localUri, user!.name)
                } else {
                    await userServices.updateCover(user!.$id, localUri, user!.name)
                }
                await refreshProfile();
            } catch (error) {
                Alert.alert("Error", "Fails to Update image. Please try again.")
                console.error(error)
            } finally {
                setIsUploading(null)
            }
        }
    }

    if (!userProfile) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" style={{ marginTop: 50 }} />
            </View>
        )
    }
    return (
        <SafeAreaView>
            <Animated.View pointerEvents={"box-none"} style={[styles.header, headerStyle]}>
                <Image style={styles.backgroundImage} source={{ uri: userProfile?.coverUrl as string }} contentFit="cover" />
                <View style={styles.headerBorder} />
            </Animated.View>
            <Animated.View style={[styles.profileCotainer, profileStyle]}>
                <Image style={[styles.profileImage]} source={{ uri: userProfile?.avatarUrl as string }} />
                <TouchableOpacity style={styles.profileIconContainer}  onPress={() => handleImageUpdate('avatar')}>

                    {
                        isUploading === 'avatar' ?
                            <ActivityIndicator size="large" color={theme.colors.elements.hydro} />
                            :
                            <ThemeIcons IconsName={Entypo} name={"edit"} style={styles.icon} size={30} />
                    }
                </TouchableOpacity>
            </Animated.View>
            <Animated.ScrollView
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: EXPANDED_HEIGHT }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <ThemeText variant="title" style={styles.nameText}>{user?.name}</ThemeText>
                </View>
            </Animated.ScrollView>
            <Animated.View
                style={[styles.header, headerStyle, { backgroundColor: 'transparent', zIndex: 100 }]}
                pointerEvents="box-none"
            >
                <TouchableOpacity
                    onPress={() => handleImageUpdate('cover')}
                    style={styles.headerEditIcon}
                    activeOpacity={0.7}
                >
                    {
                        isUploading === 'cover' ?
                            <ActivityIndicator color={theme.colors.elements.hydro} size="large"  />
                            :
                            <ThemeIcons IconsName={Feather} name={"edit"} style={styles.icon} size={30} />
                    }
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme) => ({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
    },
    headerBorder: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#eee',
        zIndex: 5,
        marginHorizontal: 16
    },
    headerEditIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 8,
        zIndex: 101,
        borderRadius: 40,
        alignSelf: 'center'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    profileCotainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileIconContainer: {
        position: 'relative',
        bottom: 30,
        right: 25,
    },
    icon: {
        color: theme.colors.elements.hydro,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 8,
        borderRadius: 40
    },
    profileImage: {
        width: PROFILE_IMAGE_SIZE,
        height: PROFILE_IMAGE_SIZE,
        borderRadius: PROFILE_IMAGE_SIZE / 2,
        borderWidth: 4,
        borderColor: 'white'
    },
    content: {
        backgroundColor: theme.colors.background,
        padding: 20,
        minHeight: 1000
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
}))
