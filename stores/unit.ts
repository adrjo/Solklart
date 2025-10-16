import { create } from "zustand";

import { Unit } from "@/models/Unit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UnitStore {
    selectedUnit: Unit;

    loadUnit: () => void;
    selectUnit: (unit: Unit) => void;

    convertKelvin: (kelvinTemperature: number) => number;

}

export const unitStore = create<UnitStore>((set, get) => ({
    selectedUnit: Unit.CELSIUS,

    loadUnit: async () => {
        const data = await AsyncStorage.getItem("unit");

        if (data) {
            try {
                const parsedUnit = Unit.fromString(data);
                set({ selectedUnit: parsedUnit });
            } catch (exception) {
                console.log("Couldn't parse unit object: " + exception);
            }
        }
    },

    selectUnit: async (unit: Unit) => {
        await AsyncStorage.setItem("unit", unit.name);

        set({ selectedUnit: unit });
    },

    convertKelvin: (kelvinTemperature: number) => {
        const selectedUnit = get().selectedUnit;
        switch (selectedUnit) {
            case Unit.CELSIUS: {
                return Math.round(kelvinTemperature - 273.15);
            }
            case Unit.FAHRENHEIT: {
                return Math.round(((kelvinTemperature - 273.15) * 1.8) + 32);
            }
            default: {
                return kelvinTemperature;
            }
        }
    }

}));