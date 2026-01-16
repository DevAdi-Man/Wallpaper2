import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type Wallpaper = {
    id: string,
    url: string,
    title?: string,
}

type state = {
    favorites: Wallpaper[]
}

type action = {
    toggleFav: (wallpaper: Wallpaper) => void,
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
