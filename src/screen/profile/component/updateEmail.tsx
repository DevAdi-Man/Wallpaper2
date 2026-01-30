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
import Toast from "react-native-toast-message"
import { useAuth } from "@/src/context/AuthContext"
import { userServices } from "@/src/services/userServices"

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

export const UpdateEmail = () => {
    const { theme } = useUnistyles()
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const { refreshUser } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values: { email: string; password: string }) => {
        setLoading(true)
        try {
            await userServices.updateEmail(values.email, values.password)
            await refreshUser()
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Email updated successfully! Please verify your new email.'
            });
            router.back();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Failed to update email.'
            });
        } finally {
            setLoading(false)
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
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.mainContainer}>
                        <ThemeText variant="title">Update Email</ThemeText>
                        <Space height={8} />
                        <ThemeText style={styles.mainSubText} variant="body" numberOfLines={3}>
                            Update your email address here. Make sure it&apos;s an active email — you&apos;ll need to verify it before the change takes effect.
                        </ThemeText>
                        <Space height={16} />
                        <View style={styles.textInputContainer}>
                            <ThemeText variant="caption" style={styles.emailLable}>Email</ThemeText>
                            <ThemeTextInput
                                placeholder="Email"
                                placeholderTextColor={theme.colors.typographySecondary}
                                varient="area"
                                style={styles.emailTextInput}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                            {touched.email && errors.email && (
                                <ThemeText variant="caption" style={styles.errorText}>{errors.email}</ThemeText>
                            )}
                        </View>
                        <Space height={16} />
                        <View style={styles.textInputContainer}>
                            <ThemeText variant="caption" style={styles.emailLable}>Password</ThemeText>
                            <View style={styles.passwordWrapper}>
                                <ThemeTextInput
                                    secureTextEntry={!showPassword}
                                    placeholder="Password"
                                    placeholderTextColor={theme.colors.typographySecondary}
                                    varient="area"
                                    style={[styles.emailTextInput, { paddingRight: 50 }]}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                    <ThemeIcons
                                        IconsName={Feather}
                                        name={showPassword ? "eye" : "eye-off"}
                                        size={20}
                                        color={theme.colors.typographySecondary}
                                    />
                                </Pressable>
                            </View>
                            {touched.password && errors.password && (
                                <ThemeText variant="caption" style={styles.errorText}>{errors.password}</ThemeText>
                            )}
                        </View>
                        <Space height={64} />
                        <ThemeButton content="Update email" isIcon={false} onPress={handleSubmit} loading={loading} />
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
