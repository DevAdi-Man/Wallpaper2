import SafeAreaView from "@/src/components/safeAreaView"
import { ThemeIcons } from "@/src/components/themeIcons"
import { ThemeText } from "@/src/components/themeText"
import { useAuth } from "@/src/context/AuthContext"
import {  Entypo,  FontAwesome } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useState } from "react"
import { ActivityIndicator, Alert,  TouchableOpacity, View } from "react-native"
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from "react-native-reanimated"
import { StyleSheet, useUnistyles } from "react-native-unistyles"
import * as ImagePicker from 'expo-image-picker';
import { userServices } from "@/src/services/userServices"
import { ChangeButton } from "./component/changeButton"
import { LogOut } from "./component/logout"
import { useRouter } from "expo-router"
import { EmailVerificationCard } from "./component/emailVerificationCard"

const EXPANDED_HEIGHT = 350;
const COLLAPSED_HEIGHT = 100;
const PROFILE_IMAGE_SIZE = 100;
const SCROLLABLE_RANGE = EXPANDED_HEIGHT - COLLAPSED_HEIGHT

export const Profile = () => {
    const [isUploading, setIsUploading] = useState<'avatar' | 'cover' | null>(null)
    const { user, userProfile, refreshProfile } = useAuth()
    const {theme}= useUnistyles()
    const router = useRouter()
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler(
        (event) => {
            scrollY.value = event.contentOffset.y
        },
        []
    )
    const headerStyle = useAnimatedStyle(() => {
        'worklet';
        const height = interpolate(
            scrollY.value,
            [0, SCROLLABLE_RANGE],
            [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
            Extrapolation.CLAMP
        )
        return {
            height
        }
    })

    const profileStyle = useAnimatedStyle(() => {
        'worklet';
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
            [1, 0.7],
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
                scrollEventThrottle={8}
                contentContainerStyle={{ paddingTop: EXPANDED_HEIGHT }}
                showsVerticalScrollIndicator={false}
                bounces={true}
                decelerationRate="fast"
            >
                <View style={styles.content}>
                    <View style={styles.profileInfo}>
                        <ThemeText variant="title" style={styles.nameText}>{user?.name}</ThemeText>
                        <ThemeText variant="body" style={styles.emailText}>{user?.email}</ThemeText>
                    </View>

                    <View style={styles.section}>
                        <ThemeText variant="body" style={styles.sectionTitle}>Account Settings</ThemeText>
                        <View style={styles.settingsContainer}>
                            <EmailVerificationCard />
                            <View style={styles.settingItem}>
                                <ChangeButton title="Update Email" onPress={()=> router.push('/(tabs)/profile/updateEmail') } />
                            </View>
                            <View style={styles.settingItem}>
                                <ChangeButton title="Change Password" onPress={()=> router.push('/(tabs)/profile/changePassword')} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <ThemeText variant="body" style={styles.sectionTitle}>Account Actions</ThemeText>
                        <View style={styles.settingsContainer}>
                            <LogOut />
                        </View>
                    </View>

                    <View style={styles.bottomSpacing} />
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
                            <ThemeIcons IconsName={FontAwesome} name={"camera"} style={styles.icon} size={30} />
                    }
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme,rt) => ({
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
        bottom: 35,
        left: 35,
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
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 32,
        paddingVertical: 16,
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    nameText: {
        fontSize: rt.fontScale * 24,
        fontWeight: 'bold',
        marginBottom: 4,
        color: theme.colors.typography
    },
    emailText: {
        fontSize: rt.fontScale * 16,
        color: theme.colors.typographySecondary,
        opacity: 0.8
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: rt.fontScale * 18,
        fontWeight: '600',
        marginBottom: 12,
        paddingLeft: 4,
        color: theme.colors.typography
    },
    settingsContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    settingItem: {
        marginVertical: 4,
    },
    bottomSpacing: {
        // height: 50,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
}))
