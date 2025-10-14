import { City } from "@/stores/City";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

//cached results
const cache: Record<string, Array<City>> = {};

export async function getCities(search: string) {
    const lower = search.trim().toLowerCase();

    if (cache[lower]) {
        return cache[lower];
    }

    const GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + search + "&limit=20" +
        "&appid=" + API_KEY;

    const response = await fetch(GEOCODING_URL);

    if (response.ok) {
        const json = await response.json();

        const mappedList: Array<City> = json.map
            ((entry: any) => new City(entry.name, entry.country, entry.lon, entry.lat, entry.state));

        cache[lower] = mappedList;
        return mappedList;
    }

    return [];
}