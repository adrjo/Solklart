import { City } from "@/models/City";
import { create } from "zustand";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesStore {
    favorites: Array<City>;

    loadFavorites: () => void;

    addFavorite: (city: City) => void;
    removeFavorite: (city: City) => void;

    isFavorite: (city: City) => boolean;
}

export const favoritesStore = create<FavoritesStore>((set, get) => ({
    favorites: [],

    loadFavorites: async () => {
        const data = await AsyncStorage.getItem("favorites");

        if (data) {
            try {
                const parsed = JSON.parse(data);
                set({ favorites: parsed });
            } catch (exception) {
                console.log("Couldn't parse favorites object: " + exception);
            }
        }
    },

    addFavorite: async (city: City) => {
        const favorites = get().favorites;
        const updated = [...favorites, city];

        // update storage
        await AsyncStorage.setItem("favorites", JSON.stringify(updated));

        // update state
        set({ favorites: updated });

    },

    removeFavorite: async (city: City) => {
        const favorites = get().favorites;
        const filtered = favorites.filter((c) => !City.equals(c, city));

        // update storage
        await AsyncStorage.setItem("favorites", JSON.stringify(filtered));

        // update state
        set({ favorites: filtered });
    },

    isFavorite: (city: City) => {
        const favorites = get().favorites;

        return favorites.some(c => City.equals(c, city));
    }
}));