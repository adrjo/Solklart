import { City } from "@/stores/City";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=" + API_KEY;
const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct?q={name}&limit=20&appid=" + API_KEY;

const cachedCities: Record<string, Array<City>> = {};

export async function getCities(search: string) {
    const lower = search.trim().toLowerCase();

    if (cachedCities[lower]) {
        return cachedCities[lower];
    }

    const response = await fetch(GEOCODING_API_URL.replace("{name}", search));

    if (response.ok) {
        const json = await response.json();

        const mappedList: Array<City> = json
            .map((entry: any) => new City(entry.name, entry.country, entry.lon, entry.lat, entry.state))
            .filter((city: City, index: Number, self: City[]) =>
                index === self.findIndex(
                    c => c.name === city.name && c.country === city.country
                ));

        cachedCities[lower] = mappedList;
        return mappedList;
    }

    return [];
}

export async function getWeather(lat: Number, lon: Number) {
}