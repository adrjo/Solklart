import { getWeatherCity, getWeatherIconUrl } from "@/api/weather";
import { City } from "@/stores/City";
import { Weather } from "@/stores/Weather";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface ICity {
    city: City;
}

export function ResultItem({ city }: ICity) {
    const [weather, setWeather] = useState<Weather>();

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const fetchedWeather: Weather = await getWeatherCity(city);
                console.log(fetchedWeather);
                setWeather(fetchedWeather);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        };

        fetchWeather();
    }, [city]);

    if (!weather) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{city.name}</Text>

            <View style={styles.row}>
                <Image
                    source={{ uri: getWeatherIconUrl(weather.weather.icon) }}
                    style={styles.icon}
                />
                <View style={styles.tempContainer}>
                    <Text style={styles.temp}>{weather.temp.temp}°</Text>
                    <Text style={styles.condition}>{weather.weather.title}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <Text style={styles.detailText}>
                    Feels like {Math.round(weather.temp.tempFeelsLike)}°
                </Text>
                <Text style={styles.detailText}>
                    H: {weather.temp.tempMax}°  L: {weather.temp.tempMin}°
                </Text>

                {(weather.rainAmt || weather.snowAmt) && (
                    <Text style={styles.detailText}>
                        {weather.rainAmt ? `Rain: ${weather.rainAmt}mm  ` : ""}
                        {weather.snowAmt ? `Snow: ${weather.snowAmt}mm` : ""}
                    </Text>
                )}

                <View style={styles.row}>
                    <Text style={styles.detailText}>
                        ☀️ {weather.sunrise.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                    <Text style={styles.detailText}>
                        🌙 {weather.sunset.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        elevation: 3,
        //ios
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 5,

        maxWidth: 400,
        width: "100%",
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 10,
        color: "#333",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        gap: 15,
    },
    icon: {
        width: 72,
        height: 72,
        marginRight: 10,
    },
    tempContainer: {
        alignItems: "flex-start",
    },
    temp: {
        fontSize: 48,
        fontWeight: "700",
        color: "#222",
    },
    condition: {
        fontSize: 18,
        color: "#555",
        textTransform: "capitalize",
    },
    details: {
        marginTop: 10,
        alignItems: "center",
        gap: 5,
    },
    detailText: {
        fontSize: 15,
        color: "#444",
    },
});