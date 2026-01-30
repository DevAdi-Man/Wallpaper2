import { View, Pressable } from 'react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { ThemeText } from '@/src/components/themeText';
import { useAuth } from '@/src/context/AuthContext';
import Toast from 'react-native-toast-message';

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
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Verification email sent! Please check your email.'
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || "Failed to send verification email"
            });
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
