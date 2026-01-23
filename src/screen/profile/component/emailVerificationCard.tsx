import { View, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { ThemeText } from '@/src/components/themeText';
import { useAuth } from '@/src/context/AuthContext';

export const EmailVerificationCard = () => {
    const [loading, setLoading] = useState(false);
    const { user, sendVerificationEmail } = useAuth();

    const isVerified = user?.emailVerification || false;

    const handleSendVerification = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const redirectUrl = 'https://devadi.me/verify';
            await sendVerificationEmail(redirectUrl);
            if (Platform.OS === 'android') {
                ToastAndroid.showWithGravity("Verification email sent! Please check your email.", ToastAndroid.LONG, ToastAndroid.CENTER);
            }
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to send verification email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <ThemeText variant="body" style={styles.emailText}>{user?.email}</ThemeText>
            </View>
            <Pressable
                style={[styles.statusCapsule, { backgroundColor: isVerified ? '#22c55e' : '#ef4444' }]}
                onPress={!isVerified ? handleSendVerification : undefined}
                disabled={loading}
            >
                <View style={styles.dot} />
                <ThemeText variant="caption" style={styles.statusText}>
                    {loading ? 'Sending...' : isVerified ? 'Verified' : 'Not Verified'}
                </ThemeText>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create((theme) => ({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.card,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    leftSection: {
        flex: 1,
    },
    emailText: {
        fontSize: 16,
        color: theme.colors.typography,
    },
    statusCapsule: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'white',
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
}));
