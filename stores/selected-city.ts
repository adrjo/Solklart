import { City } from "@/models/City";
import { create } from "zustand";

interface CityStore {
    selected: City | null;

    setSelected: (city: City) => void;
}

export const cityStore = create<CityStore>((set) => ({
    selected: null,

    setSelected: (city: City) => {
        set({selected: city});
    }
}));