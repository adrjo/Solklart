import { City } from "@/models/City";
import { create } from "zustand";

interface CityStore {
    selected: City | null;

    setSelected: (city: City | null) => void;
}

export const cityStore = create<CityStore>((set) => ({
    selected: null,

    setSelected: (city: City | null) => {
        set({selected: city});
    }
}));