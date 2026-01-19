import { addFavorites, getFavorites, removeFavorites } from '@/src/services/favoritesService'
import { WallpaperProps } from '@/src/services/wallpaperService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


type state = {
    favorites: WallpaperProps[];
    userId: string | null;
    isLoading: boolean
}

type action = {
    setUserId: (id: string) => void,
    fetchFavorites: () => Promise<void>,
    toggleFav: (wallpaper: WallpaperProps) => Promise<void>,
    isFavorites: (id: string) => boolean
}

export const useFavourites = create<state & action>()(
    persist(
        (set, get) => ({
            userId: null,
            isLoading: false,
            favorites: [],

            setUserId: (id) => set({ userId: id }),

            isFavorites: (id) => get().favorites.some(item => item.id === id),
            toggleFav: async (wallpaper) => {
                const { favorites, userId } = get()
                if (!userId) {
                    console.warn("❌ Toggle blocked: No User ID found!");
                    return;
                }
                const exists = favorites.some((item) => item.id === wallpaper.id)
                if (exists) {
                    set({
                        favorites: favorites.filter(item => item.id !== wallpaper.id)
                    })
                    try {
                        await removeFavorites(userId, wallpaper.id)
                    } catch (error) {
                        console.error("Error when toggleFav exists", error)
                        set({ favorites: [...favorites, wallpaper] })
                    }
                } else {
                    set({ favorites: [...favorites, wallpaper] })
                    try {
                        await addFavorites(userId, wallpaper.id)
                    } catch (error) {
                        console.error("Error when toggleFav does not Exist.", error)
                        set({
                            favorites: favorites.filter(item => item.id !== wallpaper.id)
                        })
                    }
                }
            },
            fetchFavorites: async () => {
                const { userId } = get();
                if (!userId) return;
                set({ isLoading: true })
                try {
                    const data = await getFavorites(userId);
                    set({ favorites: data })
                } catch (error) {
                    console.error("Error on fetchFavorites in store.", error)
                } finally {
                    set({ isLoading: false })
                }
            }
        }),
        {
            name: 'fav-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);
