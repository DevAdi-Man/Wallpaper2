import { ID, Models } from 'react-native-appwrite'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { account } from '../lib/appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AutheState {
    user: Models.User<Models.Preferences> | null;
    isLoading: boolean;
    hasHydrated: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
    createAccount: (email: string, pass: string, name: string) => Promise<void>;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AutheState>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: true,
            hasHydrated: false,

            checkAuth: async () => {
                try {
                    const user = await account.get();
                    set({ user, isLoading: false });
                } catch (error) {
                    set({ user: null, isLoading: false });
                }
            },

            login: async (email, pass) => {
                set({ isLoading: true })
                try {
                    await account.createEmailPasswordSession(email, pass);
                    const user = await account.get();
                    set({ user, isLoading: false });
                } catch (error) {
                    set({ isLoading: false });
                    throw error;
                }
            },
            logout: async () => {
                await account.deleteSession('current');
                set({ user: null });
            },
            createAccount: async (email, pass, name) => {
                await account.create(ID.unique(), email, pass, name);
                await account.createEmailPasswordSession(email, pass);
                const user = await account.get();
                set({ user });
            },
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                useAuthStore.setState({ hasHydrated: true });
                state?.checkAuth();
            }
        }
    )
)
