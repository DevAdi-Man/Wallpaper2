import SafeAreaView from "@/src/components/safeAreaView"
import { Space } from "@/src/components/space"
import { ThemeIcons } from "@/src/components/themeIcons"
import { ThemeText } from "@/src/components/themeText"
import { Feather, Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Pressable, View } from "react-native"
import { StyleSheet, useUnistyles } from "react-native-unistyles"
import { ThemeTextInput } from "@/src/components/themeTextInput"
import { useState } from "react"
import { ThemeButton } from "@/src/components/themeButton"
import { Formik } from "formik"
import * as Yup from "yup"
import { changePassword } from "@/src/services/authService"
import Toast from "react-native-toast-message"

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Current password is required'),
    newPassword: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required')
})

export const ChangePassword = () => {
    const { theme } = useUnistyles()
    const router = useRouter()
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
        setLoading(true);
        try {
            await changePassword(values.newPassword, values.oldPassword);
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Password changed successfully!'
            });
            router.back();
        } catch (error) {
            console.error("Failed to change password:", error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to change password. Please check your current password.'
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <Pressable onPress={() => router.back()} style={styles.buttonContainer}>
                <ThemeIcons IconsName={Ionicons} name="arrow-back" size={28} />
                <ThemeText variant="body" style={styles.backButtonText}>back</ThemeText>
            </Pressable>
            <Space height={16} />
            <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.mainContainer}>
                        <ThemeText variant="title">Change Password</ThemeText>
                        <Space height={8} />
                        <ThemeText style={styles.mainSubText} variant="body" numberOfLines={3}>
                            Update your password to keep your account secure. Make sure to use a strong password with at least 6 characters.
                        </ThemeText>
                        <Space height={16} />
                        
                        <View style={styles.textInputContainer}>
                            <ThemeText variant="caption" style={styles.emailLable}>Current Password</ThemeText>
                            <View style={styles.passwordWrapper}>
                                <ThemeTextInput
                                    secureTextEntry={!showOldPassword}
                                    placeholder="Current Password"
                                    placeholderTextColor={theme.colors.typographySecondary}
                                    varient="area"
                                    style={[styles.emailTextInput, { paddingRight: 50 }]}
                                    value={values.oldPassword}
                                    onChangeText={handleChange('oldPassword')}
                                    onBlur={handleBlur('oldPassword')}
                                />
                                <Pressable onPress={() => setShowOldPassword(!showOldPassword)} style={styles.eyeIcon}>
                                    <ThemeIcons
                                        IconsName={Feather}
                                        name={showOldPassword ? "eye" : "eye-off"}
                                        size={20}
                                        color={theme.colors.typographySecondary}
                                    />
                                </Pressable>
                            </View>
                            {touched.oldPassword && errors.oldPassword && (
                                <ThemeText variant="caption" style={styles.errorText}>{errors.oldPassword}</ThemeText>
                            )}
                        </View>
                        
                        <Space height={16} />
                        
                        <View style={styles.textInputContainer}>
                            <ThemeText variant="caption" style={styles.emailLable}>New Password</ThemeText>
                            <View style={styles.passwordWrapper}>
                                <ThemeTextInput
                                    secureTextEntry={!showNewPassword}
                                    placeholder="New Password"
                                    placeholderTextColor={theme.colors.typographySecondary}
                                    varient="area"
                                    style={[styles.emailTextInput, { paddingRight: 50 }]}
                                    value={values.newPassword}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                />
                                <Pressable onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
                                    <ThemeIcons
                                        IconsName={Feather}
                                        name={showNewPassword ? "eye" : "eye-off"}
                                        size={20}
                                        color={theme.colors.typographySecondary}
                                    />
                                </Pressable>
                            </View>
                            {touched.newPassword && errors.newPassword && (
                                <ThemeText variant="caption" style={styles.errorText}>{errors.newPassword}</ThemeText>
                            )}
                        </View>
                        
                        <Space height={16} />
                        
                        <View style={styles.textInputContainer}>
                            <ThemeText variant="caption" style={styles.emailLable}>Confirm New Password</ThemeText>
                            <View style={styles.passwordWrapper}>
                                <ThemeTextInput
                                    secureTextEntry={!showConfirmPassword}
                                    placeholder="Confirm New Password"
                                    placeholderTextColor={theme.colors.typographySecondary}
                                    varient="area"
                                    style={[styles.emailTextInput, { paddingRight: 50 }]}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                />
                                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                                    <ThemeIcons
                                        IconsName={Feather}
                                        name={showConfirmPassword ? "eye" : "eye-off"}
                                        size={20}
                                        color={theme.colors.typographySecondary}
                                    />
                                </Pressable>
                            </View>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <ThemeText variant="caption" style={styles.errorText}>{errors.confirmPassword}</ThemeText>
                            )}
                        </View>
                        
                        <Space height={64} />
                        <ThemeButton content="Change Password" isIcon={false} onPress={handleSubmit} loading={loading} />
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create((theme, rt) => ({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16
    },
    backButtonText: {
        fontSize: rt.fontScale * 20
    },
    mainContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent:'center'
    },
    mainSubText: {
        textAlign: 'center'
    },
    textInputContainer: {
        width: '100%',
        gap: 8
    },
    emailLable: {
        fontSize: rt.fontScale * 16,
        paddingLeft: 4
    },
    emailTextInput: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: 16
    },
    passwordWrapper: {
        justifyContent: 'center',
        position: 'relative',
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        padding: 8,
        zIndex: 1,
    },
    errorText: {
        color: '#ff4444',
        fontSize: rt.fontScale * 12,
        paddingLeft: 4
    }
}))
