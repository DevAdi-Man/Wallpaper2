import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { useUnistyles } from 'react-native-unistyles';

export default function VerifyEmailRoute() {
  const { userId, secret } = useLocalSearchParams();
  const router = useRouter();
  const { confirmEmailVerification, refreshProfile } = useAuth();
  const { theme } = useUnistyles();

  const [status, setStatus] = useState('Verifying your email...');

  useEffect(() => {
    if (userId && secret) {
      handleVerification();
    } else {
      setStatus('Error: Invalid Link');
    }
  }, [userId, secret]);

  const handleVerification = async () => {
    try {
      await confirmEmailVerification(userId as string, secret as string);

      await refreshProfile();

      setStatus('Success! Redirecting...');

      setTimeout(() => {
        router.replace('/(tabs)/profile');
      }, 1500);

    } catch (error: any) {
      setStatus('Verification Failed: ' + error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.typography, marginBottom: 20, fontSize: 18 }}>
        {status}
      </Text>
      <ActivityIndicator size="large" color={theme.colors.typography} />
    </View>
  );
}
