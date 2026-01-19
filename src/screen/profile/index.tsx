import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeIcons } from "@/src/components/themeIcons"
import { ThemeText } from "@/src/components/themeText"
import { useAuth } from "@/src/context/AuthContext"
import { Entypo, Feather } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useState } from "react"
import { ActivityIndicator, Alert, TouchableOpacity, View } from "react-native"
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated"
import { StyleSheet } from "react-native-unistyles"
import * as ImagePicker from 'expo-image-picker';
import { userServices } from "@/src/services/userServices"

const EXPANDED_HEIGHT = 350;
const COLLAPSED_HEIGHT = 100;
const PROFILE_IMAGE_SIZE = 100;
const SCROLLABLE_RANGE = EXPANDED_HEIGHT - COLLAPSED_HEIGHT

export const Profile = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const { user, userProfile, refreshProfile } = useAuth()
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
        console.log("click")
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult) {
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
            setIsUploading(true)
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
            }finally{
                setIsUploading(false)
            }
        }
    }

    const { logout } = useAuth()
    const handleLogout = async () => {
        await logout()
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
            <Animated.View style={[styles.header, headerStyle]}>
                <Image style={styles.backgroundImage} source={{uri:userProfile.coverUrl as string}} />
                <TouchableOpacity disabled={isUploading} onPress={() => handleImageUpdate('cover')} style={styles.headerEditIcon}>
                    <ThemeIcons IconsName={Feather} name={"edit"} color="white" size={30} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.profileCotainer, profileStyle]}>
                <Image style={[styles.profileImage]} source={require('@/assets/images/abstract1.jpg')} />
                <TouchableOpacity style={styles.profileIconContainer} disabled={isUploading} onPress={() => handleImageUpdate('avatar')}>
                    <ThemeIcons IconsName={Entypo} name={"edit"} style={styles.profileIcon} size={30} />
                </TouchableOpacity>
            </Animated.View>
            <Animated.ScrollView
                onScroll={onScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingTop: EXPANDED_HEIGHT }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <ThemeText variant="title" style={styles.nameText}>{userProfile.name}</ThemeText>
                    {Array.from({ length: 15 }).map((_, i) => (
                        <View key={i} style={styles.box} />
                    ))}
                </View>
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme) => ({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: theme.colors.card,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    headerEditIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor:'red',
        padding:8
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    },
    profileCotainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileIconContainer: {
        position: 'relative',
        bottom: 30,
        right: 25,
    },
    profileIcon:{
        color: theme.colors.rarity.fiveStar
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
    box: {
        height: 100,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: theme.colors.card
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
}))
