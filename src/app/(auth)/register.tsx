import { TextInput, View, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import SafeAreaView from '@/src/components/safeAreaView';
import { ThemeText } from '@/src/components/themeText';
import { Space } from '@/src/components/space';
import { ThemeButton } from '@/src/components/themeButton';
import { useAuth } from '@/src/context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

export default function RegisterScreen() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { createAccount } = useAuth();
    const router = useRouter();
    const { theme } = useUnistyles();

    const handleCreateAccount = async (values: { name: string; email: string; password: string }) => {
        setLoading(true);
        try {
            await createAccount(values.email, values.password, values.name);
            router.replace('/(tabs)/home');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Registration Failed',
                text2: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/welcome4.jpg')}
                style={styles.backgroundImage}
                contentFit="cover"
            />
            <View style={styles.overlay} />

            <SafeAreaView style={[styles.safeArea, { backgroundColor: 'transparent' }]}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.flex}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <ThemeText variant="title">Create Account</ThemeText>
                                <Space height={8} />
                                <ThemeText variant="body" style={styles.subtitle}>Sign up to get started</ThemeText>
                            </View>

                            <Space height={48} />

                            <Formik
                                initialValues={{ name: '', email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleCreateAccount}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                    <View style={styles.form}>
                                        <View style={styles.inputContainer}>
                                            <Feather name="user" size={20} color={theme.colors.typographySecondary} style={styles.icon} />
                                            <TextInput
                                                placeholder="Name"
                                                placeholderTextColor={theme.colors.typographySecondary}
                                                value={values.name}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                style={styles.input}
                                            />
                                        </View>
                                        {touched.name && errors.name && (
                                            <ThemeText variant="caption" style={styles.errorText}>{errors.name}</ThemeText>
                                        )}

                                        <Space height={16} />

                                        <View style={styles.inputContainer}>
                                            <Feather name="mail" size={20} color={theme.colors.typographySecondary} style={styles.icon} />
                                            <TextInput
                                               placeholder="Email"
                                                placeholderTextColor={theme.colors.typographySecondary}
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                style={styles.input}
                                                autoCapitalize="none"
                                                keyboardType="email-address"
                                            />
                                        </View>
                                        {touched.email && errors.email && (
                                            <ThemeText variant="caption" style={styles.errorText}>{errors.email}</ThemeText>
                                        )}

                                        <Space height={16} />

                                        <View style={styles.inputContainer}>
                                            <Feather name="lock" size={20} color={theme.colors.typographySecondary} style={styles.icon} />
                                            <TextInput
                                                placeholder="Password"
                                                placeholderTextColor={theme.colors.typographySecondary}
                                                value={values.password}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                secureTextEntry={!showPassword}
                                                style={styles.input}
                                            />
                                            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                                <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={theme.colors.typographySecondary} />
                                            </Pressable>
                                        </View>
                                        {touched.password && errors.password && (
                                            <ThemeText variant="caption" style={styles.errorText}>{errors.password}</ThemeText>
                                        )}

                                        <Space height={32} />

                                        <ThemeButton
                                            content={loading ? <ActivityIndicator color="#fff" /> : "Create Account"}
                                            isIcon={false}
                                            onPress={handleSubmit}
                                        />

                                        <Space height={24} />

                                        <View style={styles.footer}>
                                            <ThemeText variant="body" style={styles.footerText}>Already have an account? </ThemeText>
                                            <Link href="/(auth)" asChild>
                                                <Pressable>
                                                    <ThemeText variant="body" style={styles.link}>Sign In</ThemeText>
                                                </Pressable>
                                            </Link>
                                        </View>
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    safeArea: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
    },
    subtitle: {
        color: theme.colors.typographySecondary,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
        paddingHorizontal: 16,
    },
    icon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: theme.colors.typography,
    },
    eyeIcon: {
        padding: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: theme.colors.typographySecondary,
    },
    link: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        paddingLeft: 16,
        paddingTop: 4,
    },
}));
