import { getWeatherCity } from "@/api/weather";
import { City } from "@/stores/City";
import { useEffect, useState } from "react";
import { Text } from "react-native";

interface ICity {
    city: City;
}

export function ResultItem({ city }: ICity) {
    const [weather, setWeather] = useState<any>();

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                return await getWeatherCity(city);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        };

        setWeather(fetchWeather());
    }, []);

    return <Text>yep</Text>;
}