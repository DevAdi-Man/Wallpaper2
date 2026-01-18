import { WallpaperProps } from '@/src/services/wallpaperService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


type state = {
    favorites: WallpaperProps[]
}

type action = {
    toggleFav: (wallpaper: WallpaperProps) => void,
    removeFav: (id: string) => void
}

export const useFavourites = create<state & action>()(
    persist(
        (set, get) => ({
            favorites: [],

            toggleFav: (wallpaper) => {
                const { favorites } = get()
                const exists = favorites.some((item) => item.id === wallpaper.id)
                if (exists) {
                    set({
                        favorites: favorites.filter(item => item.id !== wallpaper.id)
                    })
                } else {
                    set({ favorites: [...favorites, wallpaper] })
                }
            },
            removeFav: (id) => set((state) => ({
                favorites: state.favorites.filter((item) => item.id !== id)
            }))
        }),
        {
            name: 'fav-storage',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);
