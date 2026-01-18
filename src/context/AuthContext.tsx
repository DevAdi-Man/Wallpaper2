import React, { createContext, useContext, useEffect, useState } from 'react';
import { ID, Models } from 'react-native-appwrite';
import { account } from '../lib/appwrite';

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        setIsLoading(true)
        try {
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            setUser(null);
            console.log(error)
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
        } catch (error) {
            console.error("LogoutFail: ", error)
        }
    };

    const createAccount = async (email: string, password: string, name: string) => {
        setIsLoading(true)
        try {
            await account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name
            });
            await login(email,password)
        } catch (e) {
            console.error("Registration error:", e)
            throw e;
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, createAccount }}>
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
