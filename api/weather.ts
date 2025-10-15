import { City } from "@/stores/City";
import { Weather } from "@/stores/Weather";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=" + API_KEY;
const GEOCODING_API_URL = "http://api.openweathermap.org/geo/1.0/direct?q={name}&limit=20&appid=" + API_KEY;

const WEATHER_ICON_URL = "https://openweathermap.org/img/wn/{icon}@4x.png";

const cachedCities: Record<string, Array<City>> = {};

export async function getCities(search: string) {
    const lower = search.trim().toLowerCase();

    if (cachedCities[lower]) {
        return cachedCities[lower];
    }

    const response = await fetch(GEOCODING_API_URL.replace("{name}", search));

    if (!response.ok) {
        return [];
    }

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

export async function getWeatherCity(city: City) {
    return getWeather(city.lat, city.lon);
}

export async function getWeather(lat: Number, lon: Number) {
    if (!lat || !lon) {
        throw new Error("Invalid coordinates");
    }
    const url = WEATHER_API_URL
        .replace("{lat}", lat.toString())
        .replace("{lon}", lon.toString());

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch weather at (" + lat + "," + lon + ")");
    }

    const json = await response.json();

    const main = json.main;
    const weather = json.weather?.[0] ?? {};
    const rain = json.rain?.["1h"];
    const snow = json.snow?.["1h"];

    const weatherObj = new Weather({
        temp: main.temp,
        tempFeelsLike: main.feels_like,
        tempMax: main.temp_max,
        tempMin: main.temp_min,
        title: weather.main,
        description: weather.description,
        icon: weather.icon,
        sunset: json.sys.sunset,
        sunrise: json.sys.sunrise,
        rain,
        snow,
    });

    return weatherObj;
}

export function getWeatherIconUrl(icon: string) {
    return WEATHER_ICON_URL.replace("{icon}", icon);
}