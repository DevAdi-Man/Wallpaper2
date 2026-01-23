import React, { createContext, useContext, useEffect, useState } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from '../lib/appwrite';
import { userServices } from '../services/userServices';
import { useFavourites } from '../screen/favorites/store/favourites';
import { sendEmailVerification, verifyEmail } from '../services/authService';

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    userProfile: UserProfile | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: (email: string, password: string, name: string) => Promise<void>;
    refreshProfile: () => Promise<void>;
    sendVerificationEmail: (redirectUrl: string) => Promise<void>;
    confirmEmailVerification: (userId: string, secret: string) => Promise<void>;
}
interface UserProfile {
    avatarUrl?: string | URL;
    coverUrl?: string | URL;
    accountId: string;
    name: string,
    email: string,
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        setIsLoading(true)
        try {
            const currentUser = await account.get();
            setUser(currentUser);
            useFavourites.getState().setUserId(currentUser.$id);
            const profile = await userServices.getUserProfiele(currentUser.$id, currentUser.name, currentUser.email);
            setUserProfile(profile);
            await useFavourites.getState().fetchFavorites();
        } catch (error) {
            setUser(null);
            setUserProfile(null)
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            await account.createEmailPasswordSession(
                {
                    email: email,
                    password: password
                }
            );

            const currentUser = await account.get();
            setUser(currentUser);
            useFavourites.getState().setUserId(currentUser.$id);
            const profile = await userServices.getUserProfiele(currentUser.$id, currentUser.name, email);
            setUserProfile(profile);
            await refreshProfile()
            await useFavourites.getState().fetchFavorites();
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession({
                sessionId: 'current'
            });
            setUser(null);
            setUserProfile(null);
            useFavourites.getState().setUserId(null as any);
            useFavourites.setState({ favorites: [] });
        } catch (error) {
            console.error("LogoutFail: ", error)
        }
    };

    const refreshProfile = async () => {
        if (!user) return;
        const profile = await userServices.getUserProfiele(user.$id, user.name, user.email);
        setUserProfile(profile)
    }

    const createAccount = async (email: string, password: string, name: string) => {
        setIsLoading(true)
        try {
            const newAccount = await account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            await login(email, password)
            await userServices.createProfileDocument(newAccount.$id);
            await refreshProfile()
        } catch (e) {
            console.error("Registration error:", e)
            throw e;
        } finally {
            setIsLoading(false)
        }
    };

    const sendVerificationEmail = async (redirectUrl: string) => {
        try {
            console.log("url:",redirectUrl)
            await sendEmailVerification(redirectUrl);
        } catch (error) {
            console.error("Failed to send verification email:", error);
            throw error;
        }
    };

    const confirmEmailVerification = async (userId: string, secret: string) => {
        try {
            await verifyEmail(userId, secret);
            await checkAuth(); // Refresh user data
        } catch (error) {
            console.error("Failed to verify email:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            userProfile,
            refreshProfile,
            user,
            isLoading,
            login,
            logout,
            createAccount,
            sendVerificationEmail,
            confirmEmailVerification
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
