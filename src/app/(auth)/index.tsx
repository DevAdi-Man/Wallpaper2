import { TextInput, View, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import SafeAreaView from '@/src/components/safeAreaView';
import { useAuthStore } from '@/src/store/auth';
import { ThemeText } from '@/src/components/themeText';
import { Space } from '@/src/components/space';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useAuthStore();
    const { theme } = useUnistyles();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            router.replace('/(tabs)');
        } catch (e: any) {
            Alert.alert("Login Failed", e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/abstract7.jpg')}
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
                                <ThemeText variant="title">Welcome Back</ThemeText>
                                <Space height={8} />
                                <ThemeText variant="body" style={styles.subtitle}>Sign in to continue</ThemeText>
                            </View>

                            <Space height={48} />

                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <Feather name="mail" size={20} color={theme.colors.typographySecondary} style={styles.icon} />
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor={theme.colors.typographySecondary}
                                        value={email}
                                        onChangeText={setEmail}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                    />
                                </View>

                                <Space height={16} />

                                <View style={styles.inputContainer}>
                                    <Feather name="lock" size={20} color={theme.colors.typographySecondary} style={styles.icon} />
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor={theme.colors.typographySecondary}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={!showPassword}
                                        style={styles.input}
                                    />
                                    <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                                        <Feather name={showPassword ? "eye" : "eye-off"} size={20} color={theme.colors.typographySecondary} />
                                    </Pressable>
                                </View>

                                <Space height={32} />

                                <Pressable onPress={handleLogin} disabled={loading}>
                                    <LinearGradient
                                        colors={[theme.colors.primary, theme.colors.primary]}
                                        style={styles.button}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color="#fff" />
                                        ) : (
                                            <ThemeText variant="body" style={styles.buttonText}>Sign In</ThemeText>
                                        )}
                                    </LinearGradient>
                                </Pressable>

                                <Space height={24} />

                                <View style={styles.footer}>
                                    <ThemeText variant="body" style={styles.footerText}>Don't have an account? </ThemeText>
                                    <Link href="/(auth)/register" asChild>
                                        <Pressable>
                                            <ThemeText variant="body" style={styles.link}>Sign Up</ThemeText>
                                        </Pressable>
                                    </Link>
                                </View>
                            </View>
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
    button: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
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
}));
